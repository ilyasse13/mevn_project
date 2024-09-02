// routes/userRoutes.js

import express from 'express';
import User from '../models/User.js';

const Memrouter = express.Router();

// Route to get all users
Memrouter.get('/members', async (req, res) => {
    try {
      // Retrieve all users with the number of recipes they created
      const users = await User.aggregate([
        {
          $lookup: {
            from: 'recipes', // Name of the Recipe collection
            localField: '_id', // Field in the User collection to match
            foreignField: 'createdBy', // Field in the Recipe collection to match
            as: 'recipes'
          }
        },
        {
          $addFields: {
            recipeCount: { $size: '$recipes' } // Add a field for the number of recipes
          }
        },
        {
          $project: {
            recipes: 0 // Exclude the actual recipes array from the response
          }
        }
      ]);
  
      res.status(200).json(users); // Respond with the list of users and their recipe counts
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  

export default Memrouter;
