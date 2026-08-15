import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  reserveProduct,
  updateProductStatus,
  deleteProduct,
  getSellerProducts,
  uploadImage,
} from '../controllers/productController.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

export const setupProductRoutes = (r) => {
  r.get('/', getProducts);
  r.get('/seller/mine', authMiddleware, getSellerProducts);
  r.get('/:id', getProductById);
  r.post('/', authMiddleware, createProduct);
  r.post('/upload', authMiddleware, upload.single('image'), uploadImage);
  r.post('/:id/reserve', authMiddleware, reserveProduct);
  r.patch('/:id/status', authMiddleware, updateProductStatus);
  r.delete('/:id', authMiddleware, deleteProduct);
};

setupProductRoutes(router);

export default router;
