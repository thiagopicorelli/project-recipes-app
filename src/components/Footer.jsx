import React from 'react';
import { Col, Container, Row, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

export default function Footer() {
  return (
    <Container
      fluid
      className="footer-container"
      data-testid="footer"
    >
      <Row className="my-2">
        <Col className="justify">
          <Nav.Link as={ Link } to="/drinks">
            <img
              src={ drinkIcon }
              alt="drink link button"
              data-testid="drinks-bottom-btn"
            />
          </Nav.Link>
        </Col>
        <Col className="justify">
          <Nav.Link as={ Link } to="/meals">
            <img
              className="mealIcon"
              src={ mealIcon }
              alt="meal link button"
              data-testid="meals-bottom-btn"
            />
          </Nav.Link>
        </Col>
      </Row>
    </Container>
  );
}
