
import express from 'express';
import { index, store, showRecipe, update, destroy, getRecipesByUser } from '../Controllers/RecipeController.js';

const router = express.Router();

// Route to get all recipes
router.get('/', index);

// Route to create a new recipe
router.post('/addRecipe/:id', store);

// Route to update an existing recipe
router.put('/updaterecipe/:id', update);

router.get('/:id', showRecipe);
router.get('/userRecipes/:id',getRecipesByUser)

// Route to delete a recipe
router.delete('/delete/:id', destroy);

export default router;
