import { Request, Response } from 'express';

export const createCart = async (req: Request, res: Response) => {
	return res.status(201).json({
		ok: true,
		data: 'Cart created successfully',
	});
};
