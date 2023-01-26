import React, { useCallback, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { AppContext } from '../context/AppProvider';
import Footer from '../components/Footer';

function Recipes() {
  const { searchData } = useContext(AppContext);

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
