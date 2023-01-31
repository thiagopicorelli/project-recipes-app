import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Container, Image, Row, ListGroup } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFavorite from '../hooks/useFavorite';
import { RecipesContext } from '../context/RecipesProvider';

function RecipeInProgress() {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const page = location.pathname.split('/')[1];
  const [copied, setCopied] = useState(false);
  // const [recipeFinish, setRecipeFinish] = useState();
  const [ingredientCheck, setIngredientCheck] = useState([]);
  const { toggleFavorite } = useFavorite();
  const [btnDesable, setBtndesable] = useState(true);
  // const [removeButtonFinish, setRemoveButtonFinish] = useState(false);

  const {
    getRecommendedRecipes,
    favorite,
    setFavorite,
    checkRecipeStatus,
    recipe,
    getRecipe,
    ingredients,
  } = useContext(RecipesContext);

  useEffect(() => {
    getRecipe(page, id);
    getRecommendedRecipes(page);
  }, [page, id]);

  useEffect(() => {
    checkRecipeStatus();
  }, [recipe]);

  const handleClick = useCallback(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipe));
    history.push('/done-recipes');
  }, [history]);

  const handleShare = useCallback(() => {
    const link = history.location.pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${link}`);

    setCopied(true);
  }, [location]);

  const handleFavorite = useCallback(() => {
    setFavorite(!favorite);

    toggleFavorite(recipe[0]);
  }, [favorite, recipe, toggleFavorite]);

  const handleCheck = ((i) => {
    setIngredientCheck(i);
    localStorage.setItem('inProgressRecipes', JSON.stringify(ingredientCheck));
  });

  console.log(ingredientCheck);

  const buttonDesable = useCallback(() => {
    if (ingredientCheck.length === ingredients.length) {
      setBtndesable(false);
    } else {
      setBtndesable(true);
    }
  }, [ingredientCheck, ingredients]);

  console.log(ingredientCheck);
  console.log(buttonDesable);

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
              <h3>Ingredients</h3>
              <ListGroup as="ul">
                { ingredients.map(({ ingredient, measure }, i) => (
                  <ListGroup.Item
                    key={ `${ingredient}${measure}` }
                    disabled
                    data-testid={ `${i}-ingredient-step` }
                  >
                    <label
                      htmlFor={ i }
                      className={ ingredient.checked ? 'checkedBox' : 'empty-checkbox' }
                    >
                      <input
                        type="checkbox"
                        id={ i }
                        name={ ingredient }
                        onChange={ () => handleCheck(ingredient.checked) }
                        checked={ ingredient.checked }
                      />
                      { `${ingredient} ${measure}` }
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
                disabled={ btnDesable }
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
