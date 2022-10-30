import { rulesType } from '../../config/rules';
import { LineItem } from '../../interfaces/cart';
import { calculateSubTotal } from '../others/caculateSubtotal';

function validateProductSelectorRuleType(
	skus: string[],
	lineItems: LineItem[]
) {
	let lineItemsSkus = lineItems.map((lineItem) => lineItem.sku);
	let isMatchWithSkusPromotion: boolean = lineItemsSkus.every((sku) =>
		skus.includes(sku)
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
	if (ruleType === rulesType[0]) {
		return validateProductSelectorRuleType(skus, lineItems);
	}
	if (ruleType === rulesType[1]) {
		return validateCartTotalRuleType(greaterThan, lineItems);
	}
	return false;
}
