import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Container, Button, Stack } from 'react-bootstrap';
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
      const FIVE = 5;
      setCategories(categories[path].slice(0, FIVE));
    };
    setCategoriesList();
  }, [fetchCategories, pageName, location]);

  return (
    <Container>
      <Stack direction="horizontal" className="col-md-4 mx-auto">
        {
          categoriesList.map(({ strCategory }) => (
            <Button
              key={ `cat-${strCategory}` }
              variant="outline-dark"
              data-testid={ `${strCategory}-category-filter` }
            >
              {strCategory}
            </Button>
          ))
        }
      </Stack>
    </Container>
  );
}
