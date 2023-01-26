import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import categoryMock from './mock/categoryMock';

describe('Teste da tela de receitas', () => {
  const initialEntries = ['/meals'];
  test.only('Teste das categorias', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoryMock),
    });
    renderWithRouter(<App />, { initialEntries });
    expect(global.fetch).toBeCalled();
    const beefCategory = await screen.findByRole('button', { name: /beef/i });
    expect(beefCategory).toBeInTheDocument();
  });
});
