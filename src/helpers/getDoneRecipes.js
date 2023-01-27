export default function getDoneRecipes() {
  if (!localStorage.doneRecipes) return;

  const doneRecipes = JSON.parse(localStorage.doneRecipes);
  return doneRecipes;
}
