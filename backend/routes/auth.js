import express from 'express';
import {
  requestOTP,
  verifyOTP,
  register,
  login,
  getMe,
  requestResetOTP,
  resetPasswordWithOTP,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/otp/request', requestOTP);
router.post('/otp/verify', verifyOTP);
router.post('/reset-otp/request', requestResetOTP);
router.post('/reset-password', resetPasswordWithOTP);
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);

export default router;
export { requestOTP, verifyOTP, register, login, getMe, requestResetOTP, resetPasswordWithOTP };
