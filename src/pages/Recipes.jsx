import React, { useCallback, useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { AppContext } from '../context/AppProvider';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import cleanDataAttributes from '../helper/cleanDataAttributes';

function Recipes() {
  const { fetchData, searchData, setSearchData } = useContext(AppContext);
  const location = useLocation();

  const pageName = useCallback(() => {
    switch (location.pathname) {
    case '/meals':
      return 'meal';
    default: // /drinks
      return 'cocktail';
    }
  }, [location.pathname]);

  useEffect(async () => {
    const data = await fetchData(pageName(), radioOption, searchInput);
  }, []);

  const recipeCard = useCallback((index, title, img) => (
    <Card key={ index } data-testid={ `${index}-recipe-card` }>
      <Card.Img
        variant="top"
        data-testid={ `${index}-card-img` }
        src={ img }
      />
      <Card.Body>
        <Card.Title
          data-testid={ `${index}-card-name` }
        >
          { title }
        </Card.Title>
      </Card.Body>
    </Card>
  ), []);

  const recipeListLength = 12;

  const recipeList = useCallback(() => (
    searchData.slice(0, recipeListLength).map((recipe, index) => (
      recipeCard(index, recipe.str, recipe.thumb)
    ))
  ), [searchData, recipeCard]);

  return (
    <div>
      Recipes
      { recipeList() }
      <Footer />
    </div>
  );
}

export default Recipes;
