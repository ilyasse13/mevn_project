import express from 'express';
import recipeRoutes from './recipeRoutes.js';

const router = express.Router();

// Route for recipes
router.use('/recipes', recipeRoutes);

// You can add more routes here
// router.use('/users', userRoutes);

export default router;
