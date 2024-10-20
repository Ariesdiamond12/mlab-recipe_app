import React, { useState, useEffect } from "react";
import Book from "../assets/book.jpg";
import { useParams, useNavigate } from "react-router-dom";

function AddRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // If there is an ID, fetch the recipe data to edit
    if (id) {
      fetch(`http://localhost:3000/recipe/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipeName(data.title);
          setCategory(data.category);
          setIngredients(data.ingredients.join(", "));
          setInstructions(data.instructions);
          setPreparationTime(data.preparationTime);
          setCookingTime(data.cookingTime);
          setServings(data.servings);
          setImage(data.image);
          setIsEditMode(true);
        })
        .catch((error) => console.error("Error fetching recipe:", error));
    }
  }, [id]);

  // Convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      title: recipeName,
      category,
      ingredients: ingredients.split(", "),
      instructions,
      preparationTime,
      cookingTime,
      servings,
      image, // Base64 image string
    };

    if (
      !newRecipe.title ||
      !newRecipe.category ||
      !newRecipe.ingredients.length ||
      !newRecipe.instructions ||
      !newRecipe.preparationTime ||
      !newRecipe.cookingTime ||
      !newRecipe.servings ||
      !newRecipe.image
    ) {
      setError("Please fill in all fields");
      return;
    }

    const url = isEditMode
      ? `http://localhost:3000/recipe/${id}`
      : "http://localhost:3000/recipe";
    const method = isEditMode ? "PUT" : "POST"; // PUT for edit, POST for add

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });
      const data = await response.json();
      console.log(
        `${isEditMode ? "Recipe updated" : "Recipe added"} successfully!`,
        data
      );

      setRecipeName("");
      setCategory("");
      setIngredients("");
      setInstructions("");
      setPreparationTime("");
      setCookingTime("");
      setServings("");
      setImage("");
      setError("");
      navigate("/home");
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} recipe:`,
        error
      );
      setError(
        `Error ${isEditMode ? "updating" : "adding"} recipe. Please try again.`
      );
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await convertToBase64(file);
      setImage(base64Image);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 min-h-screen w-full overflow-auto">
        {/* Left Column */}
        <div className="flex flex-col justify-center p-4">
          <form
            className="max-w-[400px] w-full mx-auto"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl font-normal text-center">
              {isEditMode ? "Edit Recipe" : "Create your own recipes"}
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
              <select
                className="border p-2 rounded-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=""></option>
                <option value="Breakfast">Breakfast</option>
                <option value="Dessert">Dessert</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Baking">Baking and Pastry</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Beverages">Beverages</option>
                <option value="Seafood">Seafood</option>
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
            <div className="flex flex-col py-2">
              <label>Upload Image</label>
              <input
                className="border p-2 rounded-lg"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              className="w-full my-4 py-4 rounded-full bg-[#A10702] shadow-lg text-white"
              type="submit"
            >
              {isEditMode ? "Update Recipe" : "Add Recipe"}
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
    </>
  );
}

export default AddRecipe;
