import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Container, Row, Stack } from 'react-bootstrap';
import getDoneRecipes from '../helpers/getDoneRecipes';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    setDoneRecipes(getDoneRecipes());
  }, []);

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
          >
            All
          </Button>
          <Button
            variant="outline-dark"
            data-testid="filter-by-meal-btn"
          >
            Meals
          </Button>
          <Button
            variant="outline-dark"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </Button>
        </ButtonGroup>
      </Row>
      <Stack
        direction="vertical"
        gap={ 3 }
      >
        { doneRecipes && doneRecipes.map((recipe, index) => (
          <Card key={ recipe.id }>
            <Card.Img
              variant="top"
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
            />
            <Card.Body>
              <Card.Title
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }
              </Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.category }
              </Card.Subtitle>
              <Card.Subtitle
                className="mb-2 text-muted"
                data-testid={ `${index}-horizontal-done-date` }
              >
                { recipe.doneDate }
              </Card.Subtitle>
              <Stack
                direction="horizontal"
                gap={ 1 }
                className="mb-2"
              >
                {recipe.tags.map((tag) => (
                  <span
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ tag }
                  >
                    { tag }
                  </span>
                ))}
              </Stack>

              <Button
                variant="info"
                size="sm"
                data-testid={ `${index}-horizontal-share-btn` }
              >
                Share
              </Button>
            </Card.Body>
          </Card>
        ))}

      </Stack>

    </Container>
  );
}

export default DoneRecipes;
