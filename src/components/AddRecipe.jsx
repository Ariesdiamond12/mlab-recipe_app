import React, { useState } from "react";
import Book from "../assets/book.jpg";

function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [error, setError] = useState("");

  const handleAddRecipe = (e) => {
    e.preventDefault();

    const newRecipe = {
      title: recipeName,
      category: category,
      ingredients: ingredients.split(", "),
      instructions: instructions,
      preparationTime: preparationTime,
      cookingTime: cookingTime,
      servings: servings,
    };

    if (
      !newRecipe.title ||
      !newRecipe.category ||
      !newRecipe.ingredients.length ||
      !newRecipe.instructions ||
      !newRecipe.preparationTime ||
      !newRecipe.cookingTime ||
      !newRecipe.servings
    ) {
      setError("Please fill in all fields");
      return;
    }

    fetch("http://localhost:3000/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Recipe added successfully!", data);
        setRecipeName("");
        setCategory("");
        setIngredients("");
        setInstructions("");
        setPreparationTime("");
        setCookingTime("");
        setServings("");
        setError("");
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
        setError("Error adding recipe. Please try again.");
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          <form
            className="max-w-[400px] w-full mx-auto p-4"
            onSubmit={handleAddRecipe}
          >
            <h1 className="text-3xl font-normal text-center">
              Create your own recipes
            </h1>
            <div className="flex flex-col py-2">
              <label>Recipe Title</label>
              <input
                className="border p-2 rounded-lg"
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2">
              <label>Category</label>
              <select className="flex flex-col py-2">
                <option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Snack">Snack</option>
                </option>
              </select>
            </div>
            <div className="flex flex-col py-2">
              <label>Ingredients (comma separated)</label>
              <input
                className="border p-2 rounded-lg"
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2">
              <label>Instructions</label>
              <input
                className="border p-2 rounded-lg"
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2">
              <label>Preparation Time</label>
              <input
                className="border p-2 rounded-lg"
                type="text"
                value={preparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2">
              <label>Cooking Time</label>
              <input
                className="border p-2 rounded-lg"
                type="text"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col py-2">
              <label>Servings</label>
              <input
                className="border p-2 rounded-lg"
                type="text"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              className="w-full my-4 py-4 rounded-full bg-[#A10702] shadow-lg shadow-[#A10702] text-white"
              type="submit"
            >
              Add Recipe
            </button>
          </form>
        </div>

        {/* Right Column */}
        <div
          className="hidden sm:block mx-3 my-2 rounded-xl"
          style={{
            backgroundImage: `url(${Book})`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div
        className="flex justify-start"
        style={{ transform: "translateY(-5dvh)" }}
      ></div>
    </>
  );
}

export default AddRecipe;
