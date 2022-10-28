import { NextFunction, Request, Response } from 'express';
import { Promotion } from '../models/Promotion';

export const validateActivatedPromotions = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { activated } = req.body;
	if (activated) {
		const promotions = await Promotion.findAll({
			where: {
				activated: true,
			},
		});
		if (promotions.length > 2) {
			return res.status(400).json({
				ok: false,
				msg: 'There are already 3 activated promotions. Please deactivate one before activating a new one.',
			});
		}
	}
	next();
};
