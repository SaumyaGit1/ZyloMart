// routes/userRoute.js
import express from 'express';
import userController from '../controllers/userController.js'; // Import the default object

const userRouter = express.Router();
userRouter.get('/', (req, res) => {
    res.send('User route is working!');
  });

// Use the functions from the default export
userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.post('/admin', userController.adminLogin);

export default userRouter;
