import { React, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [searchVisible, setSearchVisible] = useState(true);
  const [pageTitle, setTitle] = useState('');

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
  });

  return (
    <div>
      { visible
        && (
          <div>
            <div data-testid="page-title">
              { pageTitle }
            </div>
            <Link to="/profile">
              <img
                src={ profileIcon }
                alt="Ícone de perfil"
                data-testid="profile-top-btn"
              />
            </Link>
            { searchVisible
              && (
                <img
                  src={ searchIcon }
                  alt="Ícone de pesquisa"
                  data-testid="search-top-btn"
                />
              )}
          </div>
        )}
    </div>
  );
}

export default Header;
