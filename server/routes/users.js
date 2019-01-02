import express from 'express';
import users from '../controllers/users';
import validate from '../middleware/validate';

const router = express.Router();

router.post('/users/register', validate.validateUser, users.registerUser);
router.post('/auth/users/login', validate.validateUserLogin, users.login);

export default router;
