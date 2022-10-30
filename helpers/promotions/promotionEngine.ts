import { Model, Op } from 'sequelize';
import { Promotion } from '../../models/Promotion';
import { Rule } from '../../models/Rule';
import { Action } from '../../models/Action';
import { PromotionType } from '../../interfaces/promotions';
import { LineItem } from '../../interfaces/cart';
import { validateRuleType } from './validateRuleType';
import { aplicateActions } from './aplicateAction';

async function getValidPromotions() {
	const promotions: Model<PromotionType>[] = await Promotion.findAll({
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

function evaluateRules(
	validatedPromotions: Model<PromotionType>[],
	lineItems: LineItem[]
) {
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

export const evaluatePromotions = async (
	lineItems: LineItem[]
): Promise<PromotionType[] | undefined> => {
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
