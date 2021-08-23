import { Router } from 'express';
import CardsController from '../controllers/CardsController';

const router = Router();
const cardsController = new CardsController();

router.get('/card/:id', cardsController.getCardByID);
router.get('/:id', cardsController.getByCategory);
router.post('/', cardsController.setCard);
router.put('/:id', cardsController.updateCard);
router.delete('/:id', cardsController.deleteCard);

export default router;