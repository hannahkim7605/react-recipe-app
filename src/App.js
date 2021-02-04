import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  // Usually these need to be protected as environment variables
  const APP_ID = "bcc1f89c";
  const APP_KEY = "e8d3f74b15c904100e42bd8697c9f62c";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  // a state that only submits itself after we click the search button
  const [query, setQuery] = useState("chicken");
  

  // everytime the page refreshes it runs and we don't want that
  // add an empty array
  useEffect(() => {
    getRecipes();
    console.log("We are fetching data!");
  }, [query]);
  // if we make the above [search] then it'll try to fetch data from the API everytime we type anything

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };
  
  const updateSearch = e => {
    setSearch(e.target.value); // value of the input!
  };

  const getSearch = e => {
    e.preventDefault(); // to stop the page refreshing
    setQuery(search);
    setSearch(""); // setting the search back to ""
  }

  /* taking data from the state and passing it down into props */

  // className for React, class for JS 
  // <form> refreshes every time
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form"> 
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
          </button>
      </form>

      
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key = {recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
