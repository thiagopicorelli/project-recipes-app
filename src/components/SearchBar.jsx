import { React, useContext, useState, useCallback } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import cleanDataAttributes from '../helper/cleanDataAttributes';
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
    case '/meals':
      return 'meal';
    default: // /drinks
      return 'cocktail';
    }
  }, [location.pathname]);

  const onClickHandler = useCallback(async () => {
    if (searchInput.length > 1 && radioOption === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const path = location.pathname.replace('/', '');
    const idName = path === 'meals' ? 'idMeal' : 'idDrink';
    const data = await fetchData(pageName(), radioOption, searchInput); // { meals: [...]}

    if (data[path] === null || data[path].length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (data[path].length === 1) {
      history.push(`/${path}/${data[path][0][idName]}`);
    }

    const cleanData = cleanDataAttributes(data, path);

    setSearchData(cleanData[path]);
  }, [
    fetchData,
    pageName,
    radioOption,
    searchInput,
    setSearchData,
    location.pathname,
    history,
  ]);

  return (
    <>
      <InputGroup size="sm mb-1">
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
      <InputGroup size="sm" onChange={ onChangeHandler } className="mb-3">
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
