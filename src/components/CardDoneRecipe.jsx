import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Stack } from 'react-bootstrap';
import clipboardCopy from 'clipboard-copy';
import getDoneRecipes from '../helpers/getDoneRecipes';
import shareIcon from '../images/shareIcon.svg';

export default function CardDoneRecipe() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const THREE = 3;
  const ONE_SECOND = 1000;

  useEffect(() => {
    setDoneRecipes(getDoneRecipes());
  }, []);

  useEffect(() => {
    let interval = null;
    if (linkCopied && seconds === THREE) {
      interval = setInterval(() => {
        setSeconds((sec) => sec - 1);
      }, ONE_SECOND);
    } else if (linkCopied && seconds === 0) {
      clearInterval(interval);
      setLinkCopied(false);
    }
  }, [linkCopied, seconds]);

  const handleClick = useCallback(({ target: { name, id } }) => {
    console.log(name, id);
    const link = `http://localhost:3000/${name}s/${id}`;
    clipboardCopy(link);
    setLinkCopied(true);
    setSeconds(THREE);
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
            alt={ `image of ${recipe.name}` }
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
              { recipe.nationality && `${recipe.nationality} - ` }
              { recipe.alcoholicOrNot && `${recipe.alcoholicOrNot} - ` }
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
              onClick={ handleClick }
            >
              {linkCopied
                ? <span>Link copied!</span>
                : (
                  <img
                    src={ shareIcon }
                    alt="share"
                    data-testid={ `${index}-horizontal-share-btn` }
                    name={ recipe.type }
                    id={ recipe.id }
                  />
                )}

            </Button>
          </Card.Body>
        </Card>
      ))}

    </Stack>
  );
}
