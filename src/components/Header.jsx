import { React, useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [searchVisible, setSearchVisible] = useState(true);
  const [pageTitle, setTitle] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
    case '/meals':
      setVisible(true);
      setSearchVisible(true);
      setTitle('Meals');
      break;
    case '/drinks':
      setVisible(true);
      setSearchVisible(true);
      setTitle('Drinks');
      break;
    case '/profile':
      setVisible(true);
      setSearchVisible(false);
      setTitle('Profile');
      break;
    case '/done-recipes':
      setVisible(true);
      setSearchVisible(false);
      setTitle('Done Recipes');
      break;
    case '/favorite-recipes':
      setVisible(true);
      setSearchVisible(false);
      setTitle('Favorite Recipes');
      break;
    default:
      setVisible(false);
    }
  }, [location]);

  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-2">
        { visible
        && (
          <Container>
            <Navbar.Brand data-testid="page-title">
              { pageTitle }
            </Navbar.Brand>
            <Nav.Link as={ Link } to="/profile">
              <img
                src={ profileIcon }
                alt="Ícone de perfil"
                data-testid="profile-top-btn"
              />
            </Nav.Link>
            { searchVisible
              && (
                <Button
                  onClick={ () => { setInputVisible(!inputVisible); } }
                  variant="primary"
                  size="sm"
                >
                  <img
                    src={ searchIcon }
                    alt="Ícone de pesquisa"
                    data-testid="search-top-btn"
                  />
                </Button>
              )}
          </Container>
        )}

      </Navbar>
      {(inputVisible && visible) && (
        <Container
          className="mb-2"
          id="collapse-search"
        >
          <SearchBar />
        </Container>
      ) }
    </>

  );
}

export default Header;
