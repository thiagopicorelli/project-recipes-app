import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Recipes from '../pages/Recipes';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<App />);
  const linkElement = screen.getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});

test('Testa o Footer', () => {
  render(<Recipes />);
  const iconDrinks = screen.getByTestId('drinks-bottom-btn');
  const iconMeals = screen.getByTestId('meals-bottom-btn');

  expect(iconDrinks).toBeInTheDocument();
  expect(iconMeals).toBeInTheDocument();
});
