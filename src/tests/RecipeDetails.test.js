import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';

const MEALS_ROUTE = { initialEntries: ['/meals/52977'] };
const DRINK_ROUTE = { initialEntries: ['/drinks/15997'] };
const FAVORITE_BTN = 'favorite-btn';

describe('testa o Component RecipeDEtails/MealsDetails', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(oneMeal).mockResolvedValue(drinks),
      });
  });

  test('testa se o componente é renderizado corretamente', async () => {
    renderWithRouter(<App />, MEALS_ROUTE);
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const recipeImg = await screen.findByTestId('recipe-photo');
    expect(global.fetch).toHaveBeenCalledWith(url);

    const recipeTitle = screen.getByTestId('recipe-title');
    const buttonFavorites = screen.getByTestId(FAVORITE_BTN);
    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');

    expect(recipeImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(buttonFavorites).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });
  test('testa o botao de compartilhar', async () => {
    renderWithRouter(<App />, MEALS_ROUTE);
    const buttonShare = screen.getByTestId('share-btn');
    expect(buttonShare).toBeInTheDocument();
    userEvent.click(shareBtn);
    const linkCopied = await screen.findByText(/Link copied!/i);
    expect(linkCopied).toBeInTheDocument();
  });
  test('Testa o botao iniciar receita', async () => {
    global.window.localStorage.setItem('inProgressRecipes', '{"meals":{}}');

    const { history } = renderWithRouter(
      <App />,
      MEALS_ROUTE,
    );
    const startRecipeBtn = await screen.findByText(/Start Recipe/i);
    expect(startRecipeBtn).toBeInTheDocument();
    userEvent.click(startRecipeBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/15997/in-progress'));
  });
  test('testa botao Continuar receira', async () => {
    global.window.localStorage.setItem('inProgressRecipes', '{ "meals": {"52977": []}}');

    renderWithRouter(<App />, MEALS_ROUTE);

    const continuRecipeBtn = await screen.findByText(/Continue Recipe/i);
    expect(continuRecipeBtn).toBeInTheDocument();
  });
  test('', async () => {
    global.window.localStorage.setItem('favoriteRecipes', '');

    renderWithRouter(<App />, MEALS_ROUTE);

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    const favoriteFromLocalStorage = localStorage.getItem('favoriteRecipes');
    const favorites = JSON.parse(favoriteFromLocalStorage);
    expect(favorites).toHaveLength(0);
  });
  test('', async () => {
    renderWithRouter(<App />, MEALS_ROUTE);

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    const favoriteFromLocalStorage = localStorage.getItem('favoriteRecipes');
    const favorites = JSON.parse(favoriteFromLocalStorage);
    expect(favorites).toHaveLength(1);
  });
  test('', async () => {
    renderWithRouter(<App />, MEALS_ROUTE);
    // (primeiro seta algo no local, depois ve se realmente foi salvo, depois clica e ve se apagou)

    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    const favoriteFromLocalStorage = localStorage.getItem('favoriteRecipes');
    const favorites = JSON.parse(favoriteFromLocalStorage);
    expect(favorites).toHaveLength(1);
  });
});
