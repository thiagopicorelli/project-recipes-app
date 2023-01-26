import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente SearchBar', () => {
  afterEach(() => jest.clearAllMocks());
  const searchTopBtn = 'search-top-btn';
  const nameSearchRadio = 'name-search-radio';
  const execSearchButton = 'exec-search-btn';

  const mockDrinks = {
    drinks: [
      {
        idDrink: '345',
        strDrink: 'drink',
        strDrinkThumb: 'thumb',
      },
      {
        idDrink: '356',
        strDrink: 'drink2',
        strDrinkThumb: 'thumb2',
      },
    ],
  };

  test('Testa a listagem de elementos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinks),
    });

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const searchBtn = screen.getByTestId(searchTopBtn);
    act(() => {
      userEvent.click(searchBtn);
    });
    const nameRadio = screen.getByTestId(nameSearchRadio);
    act(() => {
      userEvent.click(nameRadio);
    });
    const execSearchBtn = screen.getByTestId(execSearchButton);
    act(() => {
      userEvent.click(execSearchBtn);
    });
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

    await new Promise(res => setTimeout(res, 1000));

    expect(screen.getByTestId('0-card-name')).toHaveTextContent('drink');
  });
});
