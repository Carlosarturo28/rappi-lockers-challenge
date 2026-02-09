import { Router } from 'express';
import {
  createLocker,
  getLockers,
  getLockerById,
} from '../controllers/locker.controller';

const router = Router();

// Admin: Create a new locker
router.post('/', createLocker);
// Admin/Client: Get list of lockers (can be ordered by distance)
router.get('/', getLockers);
// Admin/Client: Get a single locker by ID
router.get('/:id', getLockerById);

export default router;
