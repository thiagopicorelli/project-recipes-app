export default function useFilterRecipes() {
  const filterRecipes = (type) => {
    if (!localStorage.doneRecipes) return;

    const doneRecipes = JSON.parse(localStorage.doneRecipes);

    if (type === 'all') return doneRecipes;

    const filteredRecipesArr = doneRecipes.filter(
      (obj) => Object.keys(obj)
        .some(
          (key) => obj[key]
            .includes(type),
        ),
    );
    console.log(filteredRecipesArr);
    return filteredRecipesArr;
  };

  return {
    filterRecipes,
  };
}
