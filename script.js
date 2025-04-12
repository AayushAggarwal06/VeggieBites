// script.js

document.addEventListener("DOMContentLoaded", () => {
  const recipeGrid = document.querySelector(".recipe-grid");
  const searchInput = document.getElementById("searchInput");
  const modal = document.getElementById("recipeModal");
  const modalContent = modal.querySelector(".modal-content");
  const closeModalBtn = modal.querySelector(".close-btn");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const backToTopBtn = document.getElementById("backToTop");

  let recipes = [];

  // Fetch Recipes from JSON
  async function fetchRecipes() {
    try {
      const res = await fetch("recipes.json");
      recipes = await res.json();
      displayRecipes(recipes);
    } catch (err) {
      console.error("Failed to load recipes:", err);
    }
  }

  // Display recipes in grid
  function displayRecipes(data) {
    recipeGrid.innerHTML = "";
    data.forEach((recipe) => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");
      card.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}">
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <button class="view-btn" data-id="${recipe.id}">View Recipe</button>
        `;
      recipeGrid.appendChild(card);
    });
  }

  // Filter Recipes on Search
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query)
    );
    displayRecipes(filtered);
  });

  // Show Modal on "View Recipe"
  recipeGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-btn")) {
      const recipeId = e.target.getAttribute("data-id");
      const selectedRecipe = recipes.find((r) => r.id == recipeId);
      if (selectedRecipe) {
        modalContent.innerHTML = `
            <span class="close-btn">&times;</span>
            <h2>${selectedRecipe.title}</h2>
            <img src="${selectedRecipe.image}" alt="${
          selectedRecipe.title
        }" style="width:100%; border-radius:8px; margin: 1rem 0;"></br>
            <p><strong>Description:</strong> ${
              selectedRecipe.description
            }</p></br>
            <h4>Ingredients:</h4>
          <ul>
            ${selectedRecipe.ingredients
              .map((item) => `<li>${item}</li>`)
              .join("")}
          </ul></br>
            <h4>Steps:</h4>
            <p>${selectedRecipe.fullRecipe}</p>
          `;
        modal.style.display = "flex";
      }
    }
  });

  // Close Modal
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-btn") || e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Theme Toggle (Dark/Light)
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggleBtn.textContent = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";
  });

  // Back To Top button
  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  fetchRecipes(); // Initialize
});
