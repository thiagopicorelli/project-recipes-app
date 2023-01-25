import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Testa o componente SearchBar', () => {
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
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const nameRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameRadio);
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(execSearchBtn);
  });
});
