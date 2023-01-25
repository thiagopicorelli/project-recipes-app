import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';

function Login() {
  // const email = useRef('');
  // const password = useRef('');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    const validateBtn = () => {
      const MIN_PASSWD = 6;
      const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

      const emailValid = emailRegex.test(loginData.email);
      const passwdValid = loginData.password.length > MIN_PASSWD;
      return !(emailValid && passwdValid);
    };

    setBtnDisabled(validateBtn());
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
