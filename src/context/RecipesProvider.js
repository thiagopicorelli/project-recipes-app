import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';

export const RecipesContext = createContext();

const NUMBER_SIX = 6;
const NUMBER_FOUR = 4;

function RecipesProvider({ children }) {
  const { fetchRecipe, fetchData } = useFetch();

  const [ingredients, setIngredients] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [recipe, setRecipe] = useState([{}]);
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const getRecipe = useCallback(async (page, id) => {
    const data = await fetchRecipe(page === 'drinks' ? 'cocktail' : 'meal', id);
    console.log(data);

    setRecipe(data[page === 'drinks' ? 'drinks' : 'meals']);
  }, [fetchRecipe]);

  const idChecker = useCallback((key, idRecipe) => {
    const response = JSON
      .parse(localStorage.getItem(key) ?? '[]');

    return response
      .some(({ id: recipeId }) => recipeId === idRecipe);
  }, []);

  const checkRecipeStatus = useCallback(() => {
    const { idDrink, idMeal } = recipe[0];
    const idRecipe = idDrink || idMeal;

    setDone(idChecker('doneRecipes', idRecipe));

    setFavorite(idChecker('favoriteRecipes', idRecipe));

    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes') ?? '{}');
    const isInProgress = Object.values(inProgressRecipes)
      .some((type) => Object.keys(type)
        .some((recipeId) => recipeId === idRecipe));

    setInProgress(isInProgress);
  }, [idChecker, recipe]);

  useEffect(() => {
    const getValidIngredients = (str) => Object.entries(recipe[0])
      .filter((entry) => entry[0].includes(str))
      .filter((entry) => entry[1]);

    const ingredientsArray = () => {
      const measure = getValidIngredients('strMeasure');
      const ingredient = getValidIngredients('strIngredient');

      return ingredient.map((data, index) => ({
        ingredient: data[1],
        measure: measure[index] === undefined ? '' : measure[index][1],
      }));
    };

    setIngredients(ingredientsArray());
  }, [recipe]);

  const getRecommendedRecipes = useCallback(async (page) => {
    const options = [page === 'drinks' ? 'meal' : 'cocktail', 'name', ''];
    const key = page === 'drinks' ? 'meals' : 'drinks';

    const data = (await fetchData(...options))[key];
    const slicedData = data.slice(0, NUMBER_SIX)
      .map((rec, index) => ({ ...rec, id: index }));

    setRecommended([
      slicedData.slice(0, 2),
      slicedData.slice(2, NUMBER_FOUR),
      slicedData.slice(NUMBER_FOUR, NUMBER_SIX),
    ]);
  }, [fetchData]);

  const value = useMemo(() => ({
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
  }), [ingredients, recommended, getRecommendedRecipes,
    done, inProgress, favorite, checkRecipeStatus, recipe, getRecipe]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;

export default RecipesProvider;
