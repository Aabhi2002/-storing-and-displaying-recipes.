document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let name = document.getElementById('recipe-name').value;
    let ingredients = document.getElementById('recipe-ingredients').value;
    let imageInput = document.getElementById('recipe-image');
    let imageFile = imageInput.files[0];
    let reader = new FileReader();
    
    reader.onloadend = function() {
        let imageUrl = reader.result;
        let recipe = { name, ingredients, imageUrl };
        addRecipe(recipe);
    };
    
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
});

function addRecipe(recipe) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}

function displayRecipes() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    recipes.forEach((recipe, index) => {
        let recipeCard = `
            <div class="recipe-card">
                <img src="${recipe.imageUrl}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p>${recipe.ingredients}</p>
                <button onclick="deleteRecipe(${index})">Delete</button>
            </div>`;
        recipeList.innerHTML += recipeCard;
    });
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}

// Initialize the recipe list on page load
document.addEventListener('DOMContentLoaded', displayRecipes);
