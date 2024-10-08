import React, { useEffect, useState } from "react";
import Food from "../assets/food.jpg";
import Burgers from "../assets/burger.jpg";
import Pancakes from "../assets/pancakes.jpg";
import Gourmet from "../assets/gourmet.jpg";
import Mushrooms from "../assets/mushrooms.jpg";
import Salmon from "../assets/salmon.jpg";
import Cookies from "../assets/baked_goods.jpg";
import Dessert from "../assets/eclair.jpg";
import Roll from "../assets/springroll.jpg";
import Banana from "../assets/bananas.jpg";
import Mocktail from "../assets/mocktail.jpg";
import Sandwich from "../assets/sandwich.jpg";
import { Navigate } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [foodItems, setFoodItems] = useState([
    { name: "Burgers", description: "American dish", image: Burgers },
    { name: "Pancakes", description: "British dish", image: Pancakes },
    { name: "Gourmet", description: "Mexican dish", image: Gourmet },
    { name: "Mushroom Soup", description: "French dish", image: Mushrooms },
    { name: "Salmon Fish", description: "Seafood", image: Salmon },
    { name: "Blueberry muffins", description: "Baked Goods", image: Cookies },
    { name: "Dessert", description: "Dessert", image: Dessert },
    { name: "Spring Rolls", description: "Chinese dish", image: Roll },
    { name: "Banana Dessert", description: "Dessert", image: Banana },
    { name: "Cocktails, Mocktails", description: "Drinks", image: Mocktail },
    { name: "Breakfast Sandwich", description: "Sandwich", image: Sandwich },
  ]);

  // Load recipes from localStorage
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setFoodItems([...foodItems, ...storedRecipes]);
    setSearchResults([...foodItems, ...storedRecipes]);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const filteredResults = foodItems.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setSearchResults(filteredResults);
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
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white !important  text-3xl text-center">
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
          type="submit"
          onClick={() => (location.href = "/add-recipe")}
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap justify-center mt-10">
        {searchResults.map((result, index) => (
          <div key={index} className="w-64 m-4 bg-white rounded-lg shadow-md">
            <img
              src={result.image}
              alt={result.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{result.name}</h2>
              <p className="text-gray-600">{result.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
