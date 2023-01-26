import { React, useContext, useState, useCallback } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';

function SearchBar() {
  const [radioOption, setRadioOption] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const history = useHistory();
  const { fetchData, setSearchData } = useContext(AppContext);

  const onChangeHandler = useCallback(({ target: { value } }) => {
    setRadioOption(value);
  }, []);

  const pageName = useCallback(() => {
    switch (location.pathname) {
    case '/drinks':
      return 'cocktail';
    case '/meals':
      return 'meal';
    default:
      return '';
    }
  }, [location.pathname]);

  const onClickHandler = useCallback(async () => {
    if (searchInput.length > 1 && radioOption === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const path = location.pathname.replace('/', '');
    const data = await fetchData(pageName(), radioOption, searchInput); // { meals: [...]}

    setSearchData(data[path]);

    const idName = path === 'meals' ? 'idMeal' : 'idDrink';
    if (data[path].length === 1) {
      history.push(`/${path}/${data[path][0][idName]}`);
    }
  }, [fetchData, pageName, radioOption, searchInput, setSearchData, location.pathname]);

  return (
    <>
      <InputGroup size="sm">
        <Form.Control
          data-testid="search-input"
          value={ searchInput }
          onChange={ (event) => { setSearchInput(event.target.value); } }
          placeholder="Search"
        />
        <Button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ onClickHandler }
        >
          Search
        </Button>
      </InputGroup>
      <InputGroup size="sm" onChange={ onChangeHandler }>
        <Form.Check
          inline
          type="radio"
          data-testid="ingredient-search-radio"
          name="option"
          value="ingredient"
          label="Ingredient"
        />

        <Form.Check
          inline
          type="radio"
          data-testid="name-search-radio"
          name="option"
          value="name"
          label="Name"
        />

        <Form.Check
          inline
          type="radio"
          data-testid="first-letter-search-radio"
          name="option"
          value="first-letter"
          label="First letter"
        />

      </InputGroup>

    </>
  );
}

export default SearchBar;
