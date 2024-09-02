// server/routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, logoutUser } from '../Controllers/AuthController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

export default router;
