import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import AppProvider from './context/AppProvider';
import Recipes from './pages/Recipes';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/meals/ID" component={ RecipeDetails } />
          <Route exact path="/drinks/ID" component={ RecipeDetails } />
          <Route exact path="/meals/ID/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/ID/in-progress" component={ RecipeInProgress } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </AuthProvider>

    </AppProvider>

  );
}

export default App;
