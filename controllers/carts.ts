import { Request, Response } from 'express';
import { TAX } from '../config/consts';
import {
	calculateSubTotal,
	evaluatePromotions,
} from '../helpers/promotions/promotionEngine';

export const createCart = async (req: Request, res: Response) => {
	const { lineItems } = req.body;
	const evaluatePromotionsResult = await evaluatePromotions(lineItems);
	const sortedTotalDiscounts = evaluatePromotionsResult!.sort(
		(a: any, b: any) => a.totalDiscount - b.totalDiscount
	);
	let finaltotalDiscount = 0;
	const subTotal = calculateSubTotal(lineItems);
	let validDiscounts: any[] = [];
	let discountAccumulator = 0;
	sortedTotalDiscounts.forEach((discount: any) => {
		discountAccumulator += discount.totalDiscount;
		if (discountAccumulator > subTotal) {
			return;
		}
		finaltotalDiscount = discountAccumulator;
		validDiscounts.push(discount);
	});

	const lineItemsTotal = lineItems.reduce((acc: number, lineItem: any) => {
		return acc + lineItem.qty * lineItem.price;
	}, 0);

	// const taxes = parseFloat((lineItemsTotal * TAX).toFixed(2));
	let subtotalWithDiscounts = parseFloat(
		(subTotal - finaltotalDiscount).toFixed(2)
	);
	let taxes = parseFloat((subtotalWithDiscounts * TAX).toFixed(2));
	let totalToPay = parseFloat((subtotalWithDiscounts + taxes).toFixed(2));

	return res.status(201).json({
		data: {
			lineItemsTotal,
			discountsList: validDiscounts,
			discountAmount: parseFloat(finaltotalDiscount.toFixed(2)),
			subTotal,
			subtotalWithDiscounts,
			taxes,
			totalToPay,
		},
		message: 'Cart created successfully',
		lineItems,
		ok: true,
	});
};
