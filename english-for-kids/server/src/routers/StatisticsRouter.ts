import { Router } from 'express';
import StatisticsController from '../controllers/StatisticsController';

const router = Router();
const statisticsController = new StatisticsController();

router.get('/:id', statisticsController.getByid);
router.get('/', statisticsController.getAll);
router.post('/', statisticsController.setStat);
router.put('/:id', statisticsController.updateStat);
router.delete('/:id', statisticsController.deleteStat);

export default router;