import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Stack } from 'react-bootstrap';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { AppContext } from '../context/AppProvider';

export default function CardFavRecipe() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const { favRecipes } = useContext(AppContext);

  const THREE = 3;
  const ONE_SECOND = 1000;

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
      { favRecipes && favRecipes.map((recipe, index) => (
        <Card key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <Card.Img
              variant="top"
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              alt={ `image of ${recipe.name}` }
            />
          </Link>
          <Card.Body>
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              className="text-decoration-none"
            >
              <Card.Title
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }
              </Card.Title>
            </Link>
            <Card.Text
              data-testid={ `${index}-horizontal-top-text` }
              className="mb-2"
            >
              { recipe.alcoholicOrNot && `${recipe.alcoholicOrNot} - ` }
              { recipe.category }
            </Card.Text>
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
            <Button
              variant="primary"
              size="sm"
            >
              <img
                src={ blackHeartIcon }
                alt="Favorite icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </Button>
          </Card.Body>
        </Card>
      ))}

    </Stack>
  );
}
