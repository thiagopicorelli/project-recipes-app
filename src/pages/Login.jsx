import React, { useRef } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';

function Login() {
  const email = useRef('');
  const password = useRef('');
  // useEffect(() => { console.log(test.current.value); }, [test]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Row>
        <h1>Login</h1>
      </Row>
      <Row>
        <Form onSubmit={ handleSubmit }>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              ref={ email }
              data-testid="email-input"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              ref={ password }
              data-testid="password-input"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            data-testid="login-submit-btn"
          >
            Enter
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Login;
