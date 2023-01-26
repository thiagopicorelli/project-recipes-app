import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Profile({ history }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailStorage = JSON.parse(localStorage.user).email;
    setEmail(emailStorage);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    history.push('/');
  }, [history]);

  return (
    <>
      <Container className="align-items-center">
        <Stack
          gap={ 2 }
          direction="vertical"
        >
          <h4
            className="my-3 text-align-center"
            data-testid="profile-email"
          >
            { email }
          </h4>
          <Button
            data-testid="profile-done-btn"
            type="button"
            as={ Link }
            to="/done-recipes"
          >
            Done Recipes
          </Button>
          <Button
            data-testid="profile-favorite-btn"
            type="button"
            as={ Link }
            to="/favorite-recipes"
          >
            Favorite Recipes
          </Button>
          <Button
            data-testid="profile-logout-btn"
            variant="secondary"
            type="button"
            onClick={ handleLogout }
          >
            Logout
          </Button>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Profile;
