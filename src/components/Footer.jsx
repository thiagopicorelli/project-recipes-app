import React from 'react';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
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
          <Navbar.Brand href="/drinks">
            <img
              src={ drinkIcon }
              alt="drink link button"
              data-testid="drinks-bottom-btn"
            />
          </Navbar.Brand>
        </Col>
        <Col>
          <Navbar.Brand href="/meals">
            <img
              className="mealIcon"
              src={ mealIcon }
              alt="meal link button"
              data-testid="meals-bottom-btn"
            />
          </Navbar.Brand>
        </Col>
      </Row>
    </Container>
  );
}
