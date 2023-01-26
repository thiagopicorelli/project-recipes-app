import { React, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

function SearchBar() {
  const [radioOption, setRadioOption] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');

  const onChangeHandler = (event) => {
    setRadioOption(event.target.value);
  };

  const onClickHandler = () => {
    switch (radioOption) {
    case 'ingredient':
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      break;
    case 'name':
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
      break;
    case 'first-letter':
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
      }
      break;
    default:
      setRadioOption('ingredient');
    }
  };

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
