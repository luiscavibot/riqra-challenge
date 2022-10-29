import { Request, Response } from 'express';
import { TAX } from '../config/consts';
import { evaluatePromotions } from '../helpers/promotionEngine';

export const createCart = async (req: Request, res: Response) => {
	const { lineItems } = req.body;

	const evaluatePromotionsResult = await evaluatePromotions(lineItems);

	const lineItemsTotal = lineItems.reduce((acc: number, lineItem: any) => {
		return acc + lineItem.qty * lineItem.price;
	}, 0);

	const taxes = parseFloat((lineItemsTotal * TAX).toFixed(2));
	const subTotal = parseFloat((lineItemsTotal - taxes).toFixed(2));

	return res.status(201).json({
		data: {
			lineItemsTotal,
			taxes,
			subTotal,
			evaluatePromotionsResult,
		},
		message: 'Cart created successfully',
		lineItems,
		ok: true,
	});
};
