import React, { useState } from "react";
import Recipe from "./types";

export default function Form({
  method,
  closeModal,
  currentRecipe,
  updateRecipe,
}: {
  method: string;
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  currentRecipe: Recipe;
  updateRecipe: (updatedRecipe: Recipe) => void;
}) {
  const [recipeName, setRecipeName] = useState(currentRecipe.name);
  const [recipeIngredients, setrecipeIngredients] = useState(
    currentRecipe.ingredients
  );
  const [recipeDirections, setRecipeDirections] = useState(
    currentRecipe.directions
  );
  return (
    <dialog open={true}>
      <form action="dialog">
        <button className="x" onClick={closeModal}>
          X
        </button>
        <h2>{method === "add" ? "Add a new recipe" : "Edit recipe"}</h2>
        <label htmlFor="recipe">Recipe</label>
        <input
          type="text"
          value={recipeName}
          name="recipe"
          placeholder="Recipe Name"
          onChange={(e) => setRecipeName(e.target.value)}
        />

        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          name="ingredients"
          id="ingredients"
          cols={30}
          rows={10}
          placeholder={`Separate each ingredient with a new line: \nMilk\n2 Eggs\n1/3 Cup Sugar`}
          value={recipeIngredients}
          onChange={(e) => {
            setrecipeIngredients(e.target.value);
          }}
        ></textarea>

        <label htmlFor="directions">Directions</label>
        <textarea
          name="directions"
          id="directions"
          cols={30}
          rows={10}
          placeholder={`Separate each step with a new line: \nPreheat oven to 350°F\nCombine ingredients in pie crust\nBake until crust is golden brown. \n`}
          value={recipeDirections}
          onChange={(e) => setRecipeDirections(e.target.value)}
        ></textarea>
        <div className="bottom-buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              updateRecipe({
                name: recipeName,
                ingredients: recipeIngredients,
                directions: recipeDirections,
              });
              closeModal(e);
              // Note: Also, want to figure out autofocus when dialog is open
            }}
          >
            {method === "add" ? "Add" : "Save"}
          </button>
          <button onClick={closeModal}>Close</button>
        </div>
      </form>
    </dialog>
  );
}
