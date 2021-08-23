import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = Router();
const categoryController = new CategoryController();

router.get('/:id', categoryController.getCategory);
router.get('/', categoryController.getAllCategory);
router.post('/', categoryController.setCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCard);

export default router;