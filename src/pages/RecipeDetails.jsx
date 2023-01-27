import React, { useCallback, useEffect, useState } from 'react';
import { Button, Carousel, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import useFetch from '../hooks/useFetch';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const NUMBER_THIRTY_TWO = 32;
const NUMBER_SIX = 6;
const NUMBER_FOUR = 4;

function RecipeDetails() {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const page = location.pathname.split('/')[1];
  const [recipe, setRecipe] = useState([{}]);
  const { fetchRecipe, fetchData } = useFetch();
  const [ingredients, setIngredients] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  const pageName = useCallback(() => {
    switch (page) {
    case 'drinks':
      return 'cocktail';
    case 'meals':
      return 'meal';
    default:
      return '';
    }
  }, [page]);

  useEffect(() => {
    const getRecipe = async () => {
      const data = await fetchRecipe(pageName(), id);

      setRecipe(data[page]);
    };
    getRecipe();
    // Está chamando infinitas vezes no RecipeDetails.jsx
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, id, pageName]);

  useEffect(() => {
    const idRecipe = recipe[0][page === 'drinks' ? 'idDrink' : 'idMeal'];

    const doneRecipes = JSON
      .parse(localStorage.getItem('doneRecipes') ?? '[]');
    const isDone = doneRecipes
      .some(({ id: recipeId }) => recipeId === idRecipe);

    setDone(isDone);

    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes') ?? '{}');
    const isInProgress = Object.values(inProgressRecipes)
      .some((type) => Object.keys(type)
        .some((recipeId) => recipeId === idRecipe));

    setInProgress(isInProgress);

    const favoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes') ?? '[]');
    const isFavorite = favoriteRecipes
      .some(({ id: recipeId }) => recipeId === idRecipe);

    setFavorite(isFavorite);
  }, [recipe]);

  useEffect(() => {
    const a = async () => {
      const options = ['name', ''];
      let key;

      switch (page) {
      case 'drinks':
        options.unshift('meal');
        key = 'meals';
        break;
      case 'meals':
        options.unshift('cocktail');
        key = 'drinks';
        break;
      default:
        break;
      }

      const data = (await fetchData(...options))[key];

      const slicedData = data.slice(0, NUMBER_SIX)
        .map((rec, index) => ({ ...rec, id: index }));

      setRecommended([
        slicedData.slice(0, 2),
        slicedData.slice(2, NUMBER_FOUR),
        slicedData.slice(NUMBER_FOUR, NUMBER_SIX),
      ]);
    };

    a();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const ingredientsArray = () => {
      const measure = Object.entries(recipe[0])
        .filter((entry) => entry[0].includes('strMeasure'))
        .filter((entry) => entry[1]);

      const ingredient = Object.entries(recipe[0])
        .filter((entry) => entry[0].includes('strIngredient'))
        .filter((entry) => entry[1]);

      return ingredient
        .map((data, index) => ({
          ingredient: data[1],
          measure: measure[index][1],
        }));
    };
    setIngredients(ingredientsArray());
  }, [recipe]);

  const urlToEmbedUrl = (url) => {
    const a = url.slice(NUMBER_THIRTY_TWO);

    return `https://www.youtube.com/embed/${a}`;
  };

  const handleClick = useCallback(() => {
    history.push(`${location.pathname}/in-progress`);
  }, [history, location]);

  const handleShare = useCallback(() => {
    copy(`http://localhost:3000${location.pathname}`);
    setCopied(true);
  }, [location]);

  const handleFavorite = useCallback(() => {
    setFavorite(!favorite);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') ?? '[]');
    const { idMeal, idDrink,
      strMeal, strDrink,
      strMealThumb, strDrinkThumb,
      strArea = '',
      strCategory = '',
      strAlcoholic = '',
    } = recipe[0];

    if (!favorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, {
        id: idMeal || idDrink,
        type: idMeal ? 'meal' : 'drink',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strMeal || strDrink,
        image: strMealThumb || strDrinkThumb,
      }]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        favoriteRecipes.filter(({ id: recipeId }) => recipeId !== (idMeal || idDrink)),
      ));
    }
  }, [favorite, recipe]);

  return (
    <>
      { recipe.map(({
        idMeal,
        strMeal,
        strMealThumb,
        strCategory,
        strAlcoholic = '',
        strInstructions = '',
        strYoutube = '',
        idDrink,
        strDrink,
        strDrinkThumb,
      }, index) => (
        (idMeal || idDrink) && (
          <Container key={ `${idMeal || idDrink}${index}` }>
            <Row>
              <button
                data-testid="share-btn"
                onClick={ handleShare }
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="Share Icon" />
              </button>

              {copied && <p>Link copied!</p>}

              <button
                data-testid="favorite-btn"
                onClick={ handleFavorite }
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
              >
                <img
                  src={ favorite ? blackHeartIcon : whiteHeartIcon }
                  alt="Heart Icon"
                />
              </button>
            </Row>
            <Row>
              <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
              <h2 data-testid="recipe-category">{`${strCategory} ${strAlcoholic}`}</h2>
              <Image
                data-testid="recipe-photo"
                src={ strMealThumb || strDrinkThumb }
              />
            </Row>
            <Row>
              <h3>Ingredients</h3>
              <ListGroup as="ul">
                { ingredients.map(({ ingredient, measure }, i) => (
                  <ListGroup.Item
                    key={ `${ingredient}${measure}` }
                    disabled
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    { `${ingredient} ${measure}` }
                  </ListGroup.Item>
                )) }
              </ListGroup>
            </Row>
            <Row>
              <h3>Instructions</h3>
              <div data-testid="instructions">
                {/* {
                  strInstructions.split('STEP')
                    .filter((_, i) => i)
                    .map((step, i) => (
                      <p key={ `step-${i}` }>{ `STEP${step}` }</p>
                    ))
                } */}
                { strInstructions }
              </div>
            </Row>
            { page === 'meals' && (
              <Row>
                <iframe
                  width="853"
                  height="480"
                  data-testid="video"
                  src={ urlToEmbedUrl(strYoutube) }
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write;
               encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </Row>
            ) }
            <Row>
              <Carousel>
                { recommended.map((recipes, iX) => (
                  <Carousel.Item key={ `recipes${iX}` }>
                    { recipes.map(({
                      strDrinkThumb: imageDrink,
                      strMealThumb: imageMeal,
                      strDrink: nameDrink,
                      strMeal: nameMeal,
                      id: recipeId,
                    }) => (
                      <div
                        key={ `recipe${recipeId}` }
                        data-testid={ `${recipeId}-recommendation-card` }
                      >
                        <img
                          className="d-block w-100"
                          src={ imageMeal || imageDrink }
                          alt={ nameMeal || nameDrink }
                        />

                        <p
                          data-testid={ `${recipeId}-recommendation-title` }
                        >
                          { nameMeal || nameDrink }
                        </p>
                      </div>
                    )) }
                  </Carousel.Item>
                )) }
              </Carousel>
            </Row>
            { !done && (
              <Row>
                <Button
                  style={ { position: 'fixed', bottom: 0, width: '100vw' } }
                  variant="primary"
                  size="lg"
                  data-testid="start-recipe-btn"
                  fixed="bottom"
                  onClick={ handleClick }
                >
                  { inProgress ? 'Continue Recipe' : 'Start Recipe'}
                </Button>
              </Row>
            ) }
          </Container>
        )
      )) }
    </>
  );
}

export default RecipeDetails;
