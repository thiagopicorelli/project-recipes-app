import React, { useEffect } from 'react';
import { Col, Container, Row, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import useFooter from '../hooks/useFooter';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

export default function Footer() {
  const { visible, setVisibility } = useFooter();
  const location = useLocation();

  useEffect(() => {
    setVisibility(location);
  }, [location, setVisibility]);

  return (
    <Container
      fluid
      className="footer-container"
      data-testid="footer"
    >
      {visible && (
        <Row className="my-2">
          <Col className="justify">
            <Nav.Link as={ Link } to="/drinks">
              <img
                src={ drinkIcon }
                alt="drink link button"
                data-testid="drinks-bottom-btn"
                className="icon-light"
              />
            </Nav.Link>
          </Col>
          <Col className="justify">
            <Nav.Link as={ Link } to="/meals">
              <img
                className="icon-light"
                src={ mealIcon }
                alt="meal link button"
                data-testid="meals-bottom-btn"
              />
            </Nav.Link>
          </Col>
        </Row>
      )}
    </Container>
  );
}
