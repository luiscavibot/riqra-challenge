import { Request, Response } from 'express';
import { TAX } from '../config/consts';
import { calculateSubTotal } from '../helpers/others/caculateSubtotal';
import { evaluatePromotions } from '../helpers/promotions/promotionEngine';
import { LineItem } from '../interfaces/cart';
import { EvaluatePromotionsResponse as Discount } from '../interfaces/promotions';

export const createCart = async (req: Request, res: Response) => {
	const { lineItems } = req.body;
	const evaluatePromotionsResult = await evaluatePromotions(lineItems);
	const sortedTotalDiscounts = evaluatePromotionsResult!.sort(
		(a: Discount, b: Discount) => a.totalDiscount - b.totalDiscount
	);
	let finaltotalDiscount = 0;
	const subTotal = calculateSubTotal(lineItems);
	let validDiscounts: Discount[] = [];
	let discountAccumulator = 0;
	sortedTotalDiscounts.forEach((discount: Discount) => {
		discountAccumulator += discount.totalDiscount;
		if (discountAccumulator > subTotal) {
			return;
		}
		finaltotalDiscount = discountAccumulator;
		validDiscounts.push(discount);
	});

	const lineItemsTotal = lineItems.reduce(
		(acc: number, lineItem: LineItem) => {
			return acc + lineItem.qty * lineItem.price;
		},
		0
	);
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
