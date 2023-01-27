import React, { useContext } from 'react';
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap';
import CardDoneRecipe from '../components/CardDoneRecipe';
import { AppContext } from '../context/AppProvider';

function DoneRecipes() {
  // const { filterRecipes } = useFilterRecipes();
  // const [doneRecipes, setDoneRecipes] = useState(filterRecipes('all'));
  const { handleDoneRecipesFilter } = useContext(AppContext);

  return (
    <Container>
      <Row>
        <ButtonGroup
          size="sm"
          className="mb-2"
        >
          <Button
            variant="outline-dark"
            data-testid="filter-by-all-btn"
            name="all"
            onClick={ handleDoneRecipesFilter }
          >
            All
          </Button>
          <Button
            variant="outline-dark"
            data-testid="filter-by-meal-btn"
            name="meal"
            onClick={ handleDoneRecipesFilter }
          >
            Meals
          </Button>
          <Button
            variant="outline-dark"
            data-testid="filter-by-drink-btn"
            name="drink"
            onClick={ handleDoneRecipesFilter }
          >
            Drinks
          </Button>
        </ButtonGroup>
      </Row>
      <CardDoneRecipe />
    </Container>
  );
}

export default DoneRecipes;
