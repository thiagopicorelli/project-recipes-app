import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Testa o Header', () => {
  test('Se o Header não é renderizado na página de Login', () => {
    renderWithRouter(<App />);
    const title = screen.queryByTestId('page-title');
    expect(title).not.toBeInTheDocument();
  });
  test('Se o Header é renderizado na página de Meals', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('Se o Header é renderizado na página de Drinks', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('Se o Header é renderizado na página de Profile', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('Se o Header é renderizado na página de Done Recipes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('Se o Header é renderizado na página de Favorite Recipes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
});
