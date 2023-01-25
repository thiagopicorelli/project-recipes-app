import { React, useState } from 'react';

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
    <div>
      <input
        data-testid="search-input"
        value={ searchInput }
        onChange={ (event) => { setSearchInput(event.target.value); } }
      />
      <div onChange={ onChangeHandler }>
        <label htmlFor="option">
          Ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="option"
            value="ingredient"
          />
        </label>
        <label htmlFor="option">
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            name="option"
            value="name"
          />
        </label>
        <label htmlFor="option">
          First Letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="option"
            value="first-letter"
          />
        </label>
      </div>
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ onClickHandler }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
