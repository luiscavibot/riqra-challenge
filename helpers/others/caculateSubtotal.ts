import { TAX } from '../../config/consts';
import { LineItem } from '../../interfaces/cart';

export function calculateSubTotal(lineItems: LineItem[]) {
	const lineItemsTotal = lineItems.reduce((acc: number, lineItem: any) => {
		return acc + lineItem.qty * lineItem.price;
	}, 0);
	// const taxes = parseFloat((lineItemsTotal * TAX).toFixed(2));
	// const subTotal = parseFloat((lineItemsTotal - taxes).toFixed(2));
	const subTotal = parseFloat((lineItemsTotal / (1 + TAX)).toFixed(2));
	return subTotal;
}
