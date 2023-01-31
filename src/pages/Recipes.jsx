import React, { useCallback, useContext, useEffect } from 'react';
import { Card, Container, Stack } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
import Categories from '../components/Categories';
import cleanDataAttributes from '../helper/cleanDataAttributes';

function Recipes() {
  const { fetchData, searchData, setSearchData } = useContext(AppContext);
  const location = useLocation();
  const history = useHistory();

  const pageName = useCallback(() => {
    switch (location.pathname) {
    case '/meals':
      return 'meal';
    default: // /drinks
      return 'cocktail';
    }
  }, [location.pathname]);

  useEffect(() => {
    async function setDefaultRecipes() {
      const data = await fetchData(pageName(), 'name', '');
      const path = location.pathname.replace('/', '');
      const cleanData = cleanDataAttributes(data, path);
      setSearchData(cleanData[path]);
    }
    setDefaultRecipes();
  }, [pageName]);

  const recipeCard = useCallback((index, title, img, id) => (
    <Card
      key={ index }
      data-testid={ `${index}-recipe-card` }
      bg="light"
      text="dark"
      onClick={ () => { history.push(`${location.pathname}/${id}`); } }
    >
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
      recipeCard(index, recipe.str, recipe.thumb, recipe.id)
    ))
  ), [searchData, recipeCard]);

  return (
    <>
      <Categories />
      <Container className="pb-5 mb-4">
        <h1 className="mb-3">Recipes</h1>
        <Stack
          direction="vertical"
          gap={ 3 }
        >
          { recipeList() }
        </Stack>
      </Container>
    </>
  );
}

export default Recipes;
