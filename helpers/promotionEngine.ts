import { Op } from 'sequelize';
import { rulesType } from '../config/rules';
import { actionsType, discountsType } from '../config/actions';
import { TAX } from '../config/consts';
import { Promotion } from '../models/Promotion';
import { Rule } from '../models/Rule';
import { Action } from '../models/Action';

async function getValidPromotions() {
	const promotions = await Promotion.findAll({
		where: {
			activated: true,
			validityPeriodStart: {
				[Op.lte]: new Date(),
			},
			validityPeriodExpiration: {
				[Op.gte]: new Date(),
			},
		},
		include: [
			{
				model: Rule,
				include: [
					{
						model: Action,
					},
				],
			},
		],
	});
	return promotions;
}

function calculateTotal(lineItems: any) {
	const lineItemsTotal = lineItems.reduce((acc: number, lineItem: any) => {
		return acc + lineItem.qty * lineItem.price;
	}, 0);
	return lineItemsTotal;
}

function aplicatePercentageDiscountType(subtotal: any, discountValue: any) {
	let totalDiscount = (subtotal * discountValue) / 100;

	return parseFloat(totalDiscount.toFixed(2));
}
function aplicateFixedDiscountType(discountValue: any) {
	return discountValue;
}

export function calculateSubTotal(lineItems: any) {
	const lineItemsTotal = lineItems.reduce((acc: number, lineItem: any) => {
		return acc + lineItem.qty * lineItem.price;
	}, 0);
	const taxes = parseFloat((lineItemsTotal * TAX).toFixed(2));
	const subTotal = parseFloat((lineItemsTotal - taxes).toFixed(2));
	return subTotal;
}
function aplicateCartDiscountActionType(
	discountType: any,
	lineItems: any,
	discountValue: any
) {
	if (discountType === discountsType[0]) {
		let subtotal = calculateSubTotal(lineItems);
		return aplicatePercentageDiscountType(subtotal, discountValue);
	}
	if (discountType === discountsType[1]) {
		return aplicateFixedDiscountType(discountValue);
	}
}

function aplicateActions(actions: any, lineItems: any) {
	let totalDiscount = 0;
	actions.forEach((action: any) => {
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
function validateProductSelectorRuleType(skus: any, lineItems: any) {
	let lineItemsSkus = lineItems.map((lineItem: any) => lineItem.sku);
	let isMatchWithSkusPromotion: boolean = lineItemsSkus.every((sku: any) =>
		skus.includes(sku)
	);
	return isMatchWithSkusPromotion;
}
function validateCartTotalRuleType(greaterThan: any, lineItems: any) {
	const lineItemsTotal = calculateTotal(lineItems);
	if (lineItemsTotal > greaterThan) {
		return true;
	}
	return false;
}

function validateRuleType(
	ruleType: any,
	skus: any,
	greaterThan: any,
	lineItems: any
): boolean {
	if (ruleType === rulesType[0]) {
		return validateProductSelectorRuleType(skus, lineItems);
	}
	if (ruleType === rulesType[1]) {
		return validateCartTotalRuleType(greaterThan, lineItems);
	}
	return false;
}

function evaluateRules(validatedPromotions: any, lineItems: any) {
	let evaluateRulesResponse: any[] = [];
	validatedPromotions.forEach((promotion: any) => {
		promotion.dataValues.rules.forEach((rule: any) => {
			let { ruleType, skus, greaterThan } = rule.dataValues;

			let isValidatedRule = validateRuleType(
				ruleType,
				skus,
				greaterThan,
				lineItems
			);
			if (isValidatedRule) {
				let totalDiscount = aplicateActions(rule.actions, lineItems);
				evaluateRulesResponse.push({
					promotionName: promotion.name,
					totalDiscount,
				});
			}
		});
	});
	return evaluateRulesResponse;
}

export const evaluatePromotions = async (lineItems: any) => {
	try {
		const validatedPromotions = await getValidPromotions();
		let evaluateRulesResponse = evaluateRules(
			validatedPromotions,
			lineItems
		);
		return evaluateRulesResponse;
	} catch (error) {
		console.log(error);
	}
};
