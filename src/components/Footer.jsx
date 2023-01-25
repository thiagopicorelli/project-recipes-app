import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
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
      <Row>
        <Col>
          <img
            src={ drinkIcon }
            alt="drink link button"
            data-testid="drinks-bottom-btn"
          />
        </Col>
        <Col>
          <img
            className="mealIcon"
            src={ mealIcon }
            alt="meal link button"
            data-testid="meals-bottom-btn"
          />
        </Col>
      </Row>
    </Container>
  );
}
