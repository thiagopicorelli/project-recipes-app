import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';

export default function Categories() {
  const { fetchCategories } = useContext(AppContext);
  const [categoriesList, setCategories] = useState([]);
  const location = useLocation();

  const pageName = useCallback(() => {
    switch (location.pathname) {
    case '/drinks':
      return 'cocktail';
    case '/meals':
      return 'meal';
    default:
      return '';
    }
  }, [location.pathname]);

  useEffect(() => {
    const setCategoriesList = async () => {
      const categories = await fetchCategories(pageName());
      const path = location.pathname.replace('/', '');
      if (!categories[path]) return;
      const FIVE = 5;
      setCategories(categories[path].slice(0, FIVE));
    };
    setCategoriesList();
  }, [fetchCategories, pageName, location]);

  return (
    <Container className="text-center">
      {/* <Stack direction="horizontal" className="col-md-4 mx-auto"> */}
      <ButtonGroup
        size="sm"
        className="mb-3"
      >
        {
          categoriesList.map(({ strCategory }) => (
            <Button
              key={ `cat-${strCategory}` }
              variant="outline-dark"
              data-testid={ `${strCategory}-category-filter` }
              className="small-text"
            >
              {strCategory}
            </Button>
          ))
        }
      </ButtonGroup>

      {/* </Stack> */}
    </Container>
  );
}
