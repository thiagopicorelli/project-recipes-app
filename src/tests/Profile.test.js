import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testes da tela Profile', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem');
  });

  xtest('Testa se o localStorage é acessado', () => {
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  test('Testa se os elementos corretos estão na página', () => {
    renderWithRouter(<App />);

    const loginEmailEl = screen.getByRole('textbox');
    const loginPasswdEl = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /enter/i });

    userEvent.type(loginEmailEl, 'email@email.com');
    userEvent.type(loginPasswdEl, '12345678');
    userEvent.click(loginBtn);

    const profileEl = screen.getByAltText(/ícone de perfil/i);
    userEvent.click(profileEl);

    const emailEl = screen.getByRole('heading', { level: 4 });
    const doneBtn = screen.getByRole('button', { name: /done recipes/i });
    const favoriteBtn = screen.getByRole('button', { name: /favorite recipes/i });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    expect(emailEl).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('Se os botões levam para as páginas corretas', () => {
    const { history } = renderWithRouter(<App />);

    const loginEmailEl = screen.getByRole('textbox');
    const loginPasswdEl = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /enter/i });

    userEvent.type(loginEmailEl, 'email@email.com');
    userEvent.type(loginPasswdEl, '12345678');
    userEvent.click(loginBtn);

    const profileEl = screen.getByAltText(/ícone de perfil/i);
    userEvent.click(profileEl);

    const doneBtn = screen.getByRole('button', { name: /done recipes/i });

    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');

    userEvent.click(profileEl);
    const favoriteBtn = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');

    userEvent.click(profileEl);
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
