import upload from '../config/upload.js';
import User from '../models/User.js';


export const userUpdate = (req, res) => {
  upload.single('profilePicture')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const userId = req.params.id;
      const updates = {
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        
      };

      // If a profile picture is uploaded, include it in the updates
      if (req.file) {
        updates.image = `/uploads/${req.file.filename}`;
      }

      // Find the user by ID and update their profile
      const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  });
};
