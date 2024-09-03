import upload from '../config/upload.js';
import fs from 'fs';
import path from 'path';
import Recipe from '../models/Recipe.js';

export const index = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('createdBy', 'name email'); // Populating the 'createdBy' field with user details
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
};
export const store = (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    try {
      // Extract user ID from route parameters
      const createdBy = req.params.id;

      // Parse ingredients and instructions if they are JSON strings
      const ingredients = JSON.parse(req.body.ingredients);
      const instructions = JSON.parse(req.body.instructions);

      // Create new recipe
      const newRecipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        ingredients: ingredients,
        instructions: instructions,
        createdBy: createdBy, // Use user ID from route
        image: req.file ? `/uploads/${req.file.filename}` : null,
      });

      // Save recipe to database
      await newRecipe.save();
      res.status(201).json({ message: 'Recipe created successfully!', recipe: newRecipe });
    } catch (error) {
      res.status(500).json({ message: 'Error creating recipe', error });
    }
  });
};

  export const showRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving recipe', error });
    }
  };

  export const update = (req, res) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
  
      try {
        const recipe = await Recipe.findById(req.params.id);
  
        if (!recipe) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
  
        // If a new image is uploaded, remove the old image file
        if (req.file && recipe.image) {
          const oldImagePath = path.join(__dirname, '..', recipe.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
  
        recipe.title = req.body.title || recipe.title;
        recipe.description = req.body.description || recipe.description;
        recipe.ingredients = req.body.ingredients || recipe.ingredients;
        recipe.instructions = req.body.instructions || recipe.instructions;
        recipe.image = req.file ? `/uploads/${req.file.filename}` : recipe.image;
  
        await recipe.save();
        res.status(200).json({ message: 'Recipe updated successfully!', recipe });
      } catch (error) {
        res.status(500).json({ message: 'Error updating recipe', error });
      }
    });
  };

  export const getRecipesByUser = async (req, res) => {
    try {
      const userId = req.params.id; // Get the userId from the request parameters
      const recipes = await Recipe.find({ createdBy: userId }).sort({ createdAt: -1 }); // Fetch all recipes by the user, sorted by creation date
  
      if (!recipes.length) {
        return res.status(404).json({ message: 'No recipes found for this user.' });
      }
  
      res.status(200).json(recipes); // Send the recipes in the response
    } catch (error) {
      console.error('Error fetching user recipes:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  export const destroy = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      // Remove the image file associated with the recipe
      if (recipe.image) {
        const imagePath = path.join(__dirname, '..', recipe.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
  
      await recipe.remove();
      res.status(200).json({ message: 'Recipe deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting recipe', error });
    }
  };