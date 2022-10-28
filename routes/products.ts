import { Request, Response, Router } from 'express';
import { Product } from '../models/Product';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
	const product = await Product.create(req.body);
	res.status(201).json({
		ok: true,
		data: product,
		message: 'Product created successfully',
	});
});
export default router;

router.get('/', async (req: Request, res: Response) => {
	const products = await Product.findAll();
	res.status(200).json({
		ok: true,
		data: products,
		message: 'Products retrieved successfully',
	});
});
