
import express from 'express';
import { index, store, showRecipe, update, destroy } from '../Controllers/RecipeController.js';

const router = express.Router();

// Route to get all recipes
router.get('/', index);

// Route to create a new recipe
router.post('/addRecipe', store);

// Route to update an existing recipe
router.put('/updaterecipe/:id', update);

router.get('/:id', showRecipe);

// Route to delete a recipe
router.delete('/delete/:id', destroy);

export default router;
