import { screen, act, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente SearchBar', () => {
  afterEach(() => jest.clearAllMocks());

  test('Se a opção é alterada ao clicar na opção Name', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const nameRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameRadio);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).not.toBeChecked();
  });
  test('Se a endpoint correta é chamada de acordo com a opção selecionada', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({meals: []}),
    });

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchBtn = screen.getByTestId('search-top-btn');
    act(() => {
      userEvent.click(searchBtn);
    });
    const nameRadio = screen.getByTestId('name-search-radio');
    act(() => {
      userEvent.click(nameRadio);
    });
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    act(() => {
      userEvent.click(execSearchBtn);
    });
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  test('Se o alert aparece quando mais de uma letra for inserida com a opção first letter', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({meals: []}),
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchBtn = screen.getByTestId('search-top-btn');
    act(() => {
      userEvent.click(searchBtn);
    });
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    act(() => {
      userEvent.click(firstLetterRadio);
    });
    expect(firstLetterRadio).toBeChecked();
    const searchInput = screen.getByTestId('search-input');
    act(() => {
      //userEvent.type('ab', searchInput);
      fireEvent.change(searchInput, { target: { value: 'ab' }});
    });
    expect(searchInput).toHaveValue('ab');
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    act(() => {
      userEvent.click(execSearchBtn);
    });
    expect(window.alert).toHaveBeenCalled();
  });
  test('Se a endpoint correta é chamada de acordo com a página', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({drinks: []}),
    });

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const searchBtn = screen.getByTestId('search-top-btn');
    act(() => {
      userEvent.click(searchBtn);
    });
    const nameRadio = screen.getByTestId('name-search-radio');
    act(() => {
      userEvent.click(nameRadio);
    });
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    act(() => {
      userEvent.click(execSearchBtn);
    });
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
  test('Se redireciona para a página de detalhes do item se houver somente um item na lista', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({drinks: [{idDrink: '345'}]}),
    });

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const searchBtn = screen.getByTestId('search-top-btn');
    act(() => {
      userEvent.click(searchBtn);
    });
    const nameRadio = screen.getByTestId('name-search-radio');
    act(() => {
      userEvent.click(nameRadio);
    });
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    act(() => {
      userEvent.click(execSearchBtn);
    });
    expect(global.fetch).toHaveBeenCalled();
    waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/345');
    });
  });

});
