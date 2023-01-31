/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Carousel, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFavorite from '../hooks/useFavorite';
import { RecipesContext } from '../context/RecipesProvider';

const NUMBER_THIRTY_TWO = 32;

function RecipeDetails() {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const page = location.pathname.split('/')[1];
  const [copied, setCopied] = useState(false);
  const { toggleFavorite } = useFavorite();
  const {
    ingredients,
    recommended,
    getRecommendedRecipes,
    done,
    inProgress,
    favorite,
    setFavorite,
    checkRecipeStatus,
    recipe,
    getRecipe,
  } = useContext(RecipesContext);

  useEffect(() => {
    getRecipe(page, id);
    getRecommendedRecipes(page);
  }, [page, id]);

  useEffect(() => {
    checkRecipeStatus();
  }, [recipe]);

  const urlToEmbedUrl = (url) => `https://www.youtube.com/embed/${url.slice(NUMBER_THIRTY_TWO)}`;

  const handleClick = useCallback(() => {
    history.push(`${location.pathname}/in-progress`);
  }, [history, location]);

  const handleShare = useCallback(() => {
    copy(`http://localhost:3000${location.pathname}`);

    setCopied(true);
  }, [location]);

  const handleFavorite = useCallback(() => {
    setFavorite(!favorite);

    toggleFavorite(recipe[0]);
  }, [favorite, recipe, toggleFavorite]);

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
