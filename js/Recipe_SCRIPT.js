// Recipe_SCRIPT.js

// Recipe_SCRIPT.js

document.addEventListener('DOMContentLoaded', () => {
  const foodTypeSelect = document.getElementById('food-type-select');
  const recipeSelect = document.getElementById('recipe-select');
  const sectionSelect = document.getElementById('section-select');
  const loadButton = document.getElementById('load-recipe');
  const contentDiv = document.getElementById('doc-content');

  // Map food types to recipe files
  const recipesByType = {
    Bread: [
      {
        name: "Milk Bread",
        file: "/DATA/RECIPES/FOOD_BREAD_MILK-BREAD.txt"
      }


    ],
    Chicken: [
      { name: "Chicken Tagine", file: "FOOD_CHICKEN_TAGINE.txt" },
      { name: "Chicken Shawarma", file: "FOOD_CHICKEN_SHAWARMA.txt" }
    ],
    "Sweet Treats": [],
    Beef: [],
    Lamb: [],
    Pork: [],
    Vegetarian: []
  };

  // Update Recipe dropdown when Food Type changes
  foodTypeSelect.addEventListener('change', () => {
    const selectedType = foodTypeSelect.value;
    const recipes = recipesByType[selectedType] || [];

    // Clear previous options
    recipeSelect.innerHTML = '<option value="">Recipe</option>';

    // Add matching recipes
    recipes.forEach(recipe => {
      const option = document.createElement('option');
      option.value = recipe.file;
      option.textContent = recipe.name;
      recipeSelect.appendChild(option);
    });

    // Reset content
    contentDiv.textContent = 'Select a recipe and section to display.';
  });

  function loadRecipe(file, section) {
    if (!file) {
      contentDiv.textContent = 'Please select a recipe.';
      return;
    }

    contentDiv.textContent = 'Loading...';

    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(data => {
        const regex = new RegExp(`#SECTION:${section}[\\s\\S]*?#ENDSECTION`, 'i');
        const match = data.match(regex);
        const sectionContent = match
          ? match[0].replace(/#SECTION:[A-Z-]+|#ENDSECTION/g, '').trim()
          : 'Section not found.';
        contentDiv.textContent = sectionContent;
      })
      .catch(error => {
        contentDiv.textContent = 'Error loading document.';
        console.error('Error:', error);
      });
  }

  loadButton.addEventListener('click', () => {
    const selectedFile = recipeSelect.value;
    const selectedSection = sectionSelect.value;
    loadRecipe(selectedFile, selectedSection);
  });
});

console.log("Fetching file:", recipe.file);
