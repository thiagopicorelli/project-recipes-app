/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { AuthContext } from '../context/AuthProvider';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { btnDisabled, validateBtn } = useContext(AuthContext);

  useEffect(() => {
    validateBtn(loginData);
  }, [loginData]);

  // useEffect(() => { console.log(test.current.value); }, [test]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = ({ target: { value, name } }) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
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
              data-testid="email-input"
              value={ loginData.email }
              name="email"
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              data-testid="password-input"
              value={ loginData.password }
              name="password"
              onChange={ handleChange }
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            data-testid="login-submit-btn"
            disabled={ btnDisabled }
          >
            Enter
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Login;
