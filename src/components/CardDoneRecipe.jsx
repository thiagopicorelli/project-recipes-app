import React, { useState, useEffect } from 'react';
import { Button, Card, Stack } from 'react-bootstrap';
import getDoneRecipes from '../helpers/getDoneRecipes';
import shareIcon from '../images/shareIcon.svg';

export default function CardDoneRecipe() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    setDoneRecipes(getDoneRecipes());
  }, []);

  return (
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
              {recipe.nationality
                ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.category}`}
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

            >
              <img
                src={ shareIcon }
                alt="share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </Button>
          </Card.Body>
        </Card>
      ))}

    </Stack>
  );
}
