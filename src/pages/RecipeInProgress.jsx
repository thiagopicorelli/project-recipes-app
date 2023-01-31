import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Container, Image, Row, ListGroup } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFavorite from '../hooks/useFavorite';
import { RecipesContext } from '../context/RecipesProvider';
import '../styles/Recipe.css';

function RecipeInProgress() {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const page = location.pathname.split('/')[1];
  const [copied, setCopied] = useState(false);
  const { toggleFavorite } = useFavorite();
  const [btnEnabled, setBtnEnabled] = useState(false);

  const {
    favorite,
    setFavorite,
    checkRecipeStatus,
    recipe,
    ingredients,
    setIngredients,
    getPageInfo,
  } = useContext(RecipesContext);

  useEffect(() => {
    getPageInfo(id, page);
  }, [page, id, getPageInfo]);

  useEffect(() => {
    checkRecipeStatus();
  }, [recipe, checkRecipeStatus]);

  const doneRecipeObjectBuild = useCallback(() => {
    const {
      strArea,
      strCategory,
      strAlcoholic,
      strMeal,
      strDrink,
      strMealThumb,
      strDrinkThumb,
      strTags,
    } = recipe[0];

    return {
      id,
      type: page.slice(0, page.length - 1),
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
      doneDate: new Date(),
      tags: strTags ? strTags.split(',') : [],
    };
  }, [id, page, recipe]);

  const handleClick = useCallback(() => {
    const a = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    localStorage.setItem('doneRecipes', JSON.stringify([...a, doneRecipeObjectBuild()]));

    history.push('/done-recipes');
  }, [doneRecipeObjectBuild, history]);

  const handleShare = useCallback(() => {
    const link = history.location.pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${link}`);

    setCopied(true);
  }, [history]);

  const handleFavorite = useCallback(() => {
    setFavorite(!favorite);

    toggleFavorite(recipe[0]);
  }, [favorite, recipe, toggleFavorite]);

  const setLocalStorage = (array) => {
    const a = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');

    if (!a[page]) a[page] = {};
    a[page][id] = array
      .filter(({ checked }) => checked)
      .map(({ ingredient }) => ingredient);

    localStorage.setItem('inProgressRecipes', JSON.stringify(a));
  };

  const handleCheck = ((index) => {
    const newIngredients = ingredients.map((ingredient) => (ingredient.id === index
      ? ({
        ...ingredient,
        checked: !ingredient.checked,
      })
      : ingredient));

    setIngredients(newIngredients);

    setLocalStorage(newIngredients);
  });

  useEffect(() => {
    const ingredientsDone = ingredients.filter(({ checked }) => checked);

    setBtnEnabled(ingredientsDone.length === ingredients.length);
  }, [ingredients]);

  return (
    <>
      { recipe.map(({
        idMeal,
        strMeal,
        strMealThumb,
        strCategory,
        strAlcoholic = '',
        strInstructions = '',
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

              { copied && <p>Link copied!</p> }

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
              <h3>
                Ingredients
              </h3>
              <ListGroup
                as="ul"
              >
                { ingredients.map((
                  { ingredient, measure, id: ingIndex, checked },
                ) => (
                  <ListGroup.Item
                    key={ `${ingredient}${measure}` }
                    enabled="false"
                    as="li"
                  >
                    <label
                      htmlFor={ ingIndex }
                      data-testid={ `${ingIndex}-ingredient-step` }
                      className={ checked
                        ? 'text-decoration-dashed'
                        : '' }
                    >
                      <input
                        type="checkbox"
                        id={ ingIndex }
                        name={ ingredient }
                        onChange={ () => handleCheck(ingIndex) }
                        checked={ checked }
                      />
                      { ` ${ingredient} ${measure}` }
                    </label>
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
            <Row>
              <Button
                style={ { position: 'fixed', bottom: 0, width: '100vw' } }
                variant="primary"
                size="lg"
                data-testid="finish-recipe-btn"
                fixed="bottom"
                disabled={ !btnEnabled }
                onClick={ handleClick }
              >
                Finalizar Receita
              </Button>
            </Row>
          </Container>
        )
      )) }
    </>
  );
}

export default RecipeInProgress;
