import React, { useEffect, useState } from "react";
import Food from "../assets/food.jpg";
import RecipeModal from "./RecipeModal";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  // Fetch recipes from the server
  useEffect(() => {
    fetch("http://localhost:3000/recipe")
      .then((response) => response.json())
      .then((data) => {
        setFoodItems(data);
        setSearchResults(data); // By default, display all recipes
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const filteredResults = foodItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const deleteRecipe = async (id) => {
    try {
      // Sending DELETE request to delete the recipe by ID
      await fetch(`http://localhost:3000/recipe/${id}`, {
        method: "DELETE",
      });

      // Update the local state to remove the deleted recipe
      const updatedFoodItems = foodItems.filter((recipe) => recipe.id !== id);
      setFoodItems(updatedFoodItems);
      setSearchResults(updatedFoodItems); // Update search results as well
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  return (
    <div>
      <div className="relative">
        <div
          className="h-screen md:h-90 xl:h-64 bg-cover bg-zinc-900/90 bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0,0,0.5), rgba(0, 0,0,0.5)),url(${Food})`,
          }}
        >
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white !important text-3xl text-center">
            Welcome to Foodie Heaven!
          </h1>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex justify-center mt-10">
        <input
          className="w-80 m-4 p-4 rounded-2xl shadow-lg"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <button
          className="w-36 my-4 py-4 rounded-full bg-[#A10702] shadow-md text-white ml-4"
          type="submit"
        >
          Search
        </button>
        <button
          className="w-36 my-4 py-4 rounded-full bg-[#A10702] shadow-md text-white ml-4"
          type="button"
          onClick={() => (location.href = "/add-recipe")}
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap justify-center mt-10">
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div key={index} className="w-64 m-4 bg-white rounded-lg shadow-md">
              <img
                src={result.image}
                alt={result.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{result.title}</h2>
                <p className="text-gray-600">{result.description}</p>
              </div>
              <RecipeModal result={result} onDelete={deleteRecipe} />
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
