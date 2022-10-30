import { actionsType, discountsType } from '../../config/actions';
import { LineItem } from '../../interfaces/cart';
import { ActionType } from '../../interfaces/promotions';
import { calculateSubTotal } from '../others/caculateSubtotal';

function aplicatePercentageDiscountType(
	subtotal: number,
	discountValue: number
) {
	let totalDiscount = (subtotal * discountValue) / 100;

	return parseFloat(totalDiscount.toFixed(2));
}
function aplicateFixedDiscountType(discountValue: number) {
	return discountValue;
}

function aplicateCartDiscountActionType(
	discountType: string,
	lineItems: LineItem[],
	discountValue: number
) {
	if (discountType === discountsType[0]) {
		let subtotal = calculateSubTotal(lineItems);
		return aplicatePercentageDiscountType(subtotal, discountValue);
	}
	if (discountType === discountsType[1]) {
		return aplicateFixedDiscountType(discountValue);
	}
	return 0;
}

export function aplicateActions(actions: ActionType[], lineItems: LineItem[]) {
	let totalDiscount = 0;
	actions.forEach((action) => {
		let { actionType, discountType, discountValue } = action.dataValues;

		if (actionType === actionsType[0]) {
			totalDiscount += aplicateCartDiscountActionType(
				discountType,
				lineItems,
				discountValue
			);
		}
	});
	return totalDiscount;
}
