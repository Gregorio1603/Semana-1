import { Router } from 'express';
import {
  createHabit, listHabits, getHabit, updateHabit, deleteHabit, completeHabit
} from '../controllers/habits.controller.js';
const router = Router();

router.get('/', listHabits);
router.post('/', createHabit);
router.get('/:id', getHabit);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);
router.post('/:id/complete', completeHabit);

export default router;