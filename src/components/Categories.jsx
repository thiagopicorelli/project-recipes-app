import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AppContext } from '../context/AppProvider';

export default function Categories() {
  const { fetchCategories } = useContext(AppContext);

  return (
    <Container>
      <Row>
        <Col>
          <Button
            variant="outline-dark"
          // data-testid=${categoryName}-category-filter
          >
            btn
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
