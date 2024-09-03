import express from 'express';
import { userUpdate } from '../Controllers/UserController.js';


const Userroute = express.Router();

Userroute.put('/updateUser/:id', userUpdate);

export default Userroute