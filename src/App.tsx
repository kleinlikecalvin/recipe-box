import "./App.scss";
import { useState } from "react";
import Form from "./Form";

export default function App() {
  const [recipes, setRecipes] = useState([
    {
      name: "Chicken and Rice",
      ingredients: "Chicken\nRice",
      directions: "Heat pan\nCook chicken\nBoil water\nCook rice",
    },
    {
      name: "Chicken and Pasta",
      ingredients: "Chicken\nPasta",
      directions: "Heat pan\nCook chicken\nBoil water\nCook pasta",
    },
    {
      name: "Chicken and Grits",
      ingredients: "Chicken\nGrits",
      directions: "Heat pan\nCook chicken\nBoil water\nCook grits",
    },
  ]);
  const [currentRecipe, setCurrentRecipe] = useState({
    name: "Chicken and Rice",
    ingredients: "Chicken\nRice",
    directions: "Heat pan\nCook chicken\nBoil water\nCook rice",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [method, setMethod] = useState("add");

  function handleDelete(key: string) {
    const updatedRecipes = recipes.filter((recipe) => recipe.name !== key);
    setRecipes(updatedRecipes);
    setCurrentRecipe({
      name: "",
      ingredients: "",
      directions: "",
    });
  }

  function addRecipe() {
    setMethod("add");
    setCurrentRecipe({
      name: "",
      ingredients: "",
      directions: "",
    });
    setIsOpen(true);
  }

  function editRecipe() {
    setMethod("edit");
    setIsOpen(true);
  }

  return (
    <div className="App">
      {isOpen ? (
        <Form
          method={method}
          closeModal={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
          currentRecipe={currentRecipe}
          updateRecipe={(updatedRecipe) => {
            const updatedRecipes = [...recipes];
            const recipeToUpdate = recipes.find(
              ({ name }) => name === updatedRecipe.name
            );
            if (recipeToUpdate) {
              Object.assign(recipeToUpdate, updatedRecipe);
            } else {
              updatedRecipes.push(updatedRecipe);
            }
            setCurrentRecipe(updatedRecipe);
            setRecipes(updatedRecipes);
          }}
        />
      ) : null}
      <h1>Recipe Box</h1>
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <button
            key={recipe.name}
            className={recipe.name === currentRecipe.name ? "highlight" : ""}
            onClick={() => setCurrentRecipe(recipe)}
          >
            {recipe.name}
          </button>
        ))}
      </div>
      <button className="add-recipe" onClick={() => addRecipe()}>
        add recipe
      </button>
      <div className="current-recipe">
        {currentRecipe.name === "" && (
          <>
            {" "}
            <h2>What's cookin' good lookin'?</h2>
            <p>Select or add a recipe.</p>
          </>
        )}

        {currentRecipe.name && <h2>{currentRecipe.name}</h2>}
        {currentRecipe.name !== "" && (
          <>
            <div className="content">
              <h3>Ingredients</h3>
              <ul>
                {currentRecipe.ingredients.split("\n").map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
              <h3>Directions</h3>
              <ol>
                {currentRecipe.directions.split("\n").map((direction) => (
                  <li key={direction}>{direction}</li>
                ))}
              </ol>
            </div>
            <div className="footer">
              <button className="edit-recipe" onClick={() => editRecipe()}>
                edit
              </button>
              <button
                className="delete-recipe"
                onClick={() => handleDelete(currentRecipe.name)}
              >
                delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
