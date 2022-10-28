import { Router } from 'express';
import { createCart } from '../controllers/carts';

const router = Router();

router.post('/', createCart);
export default router;
