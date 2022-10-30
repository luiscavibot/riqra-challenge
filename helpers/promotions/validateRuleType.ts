import { rulesType } from '../../config/rules';
import { LineItem } from '../../interfaces/cart';
import { calculateSubTotal } from '../others/caculateSubtotal';

function validateProductSelectorRuleType(
	skus: string[],
	lineItems: LineItem[]
) {
	let lineItemsSkus = lineItems.map((lineItem) => lineItem.sku);
	let isMatchWithSkusPromotion: boolean = skus.every((sku) =>
		lineItemsSkus.includes(sku)
	);
	return isMatchWithSkusPromotion;
}
function validateCartTotalRuleType(greaterThan: number, lineItems: LineItem[]) {
	const lineItemsTotal = calculateSubTotal(lineItems);
	if (lineItemsTotal > greaterThan) {
		return true;
	}
	return false;
}

export function validateRuleType(
	ruleType: string,
	skus: string[],
	greaterThan: number,
	lineItems: LineItem[]
): boolean {
	// console.log('ruleType......', ruleType);
	if (ruleType === rulesType[0]) {
		console.log("Regla de tipo 'PRODUCTSELECTOR'");

		return validateProductSelectorRuleType(skus, lineItems);
	}
	if (ruleType === rulesType[1]) {
		console.log("Regla de tipo 'CARTTOTAL'");
		return validateCartTotalRuleType(greaterThan, lineItems);
	}
	return false;
}
