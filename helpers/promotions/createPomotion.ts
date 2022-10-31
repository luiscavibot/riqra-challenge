import { Model, Op, Validator } from 'sequelize';
import {
	ActionType,
	PromotionType,
	RuleType,
} from '../../interfaces/promotions';
import { Action } from '../../models/Action';
import { Promotion } from '../../models/Promotion';
import { Rule } from '../../models/Rule';
import { Request } from 'express';

export async function createRules(
	newPromotion: Model<PromotionType>,
	rules: RuleType[]
) {
	rules.forEach(async (rule) => {
		let { ruleType, skus, greaterThan } = rule;
		let newRule = await Rule.create({
			ruleType,
			promotionId: newPromotion.getDataValue('id'),
			skus,
			greaterThan,
		});
		await createActions(newRule.getDataValue('id'), rule.actions);
	});
}

export async function createActions(
	newRule_id: string,
	rule_actions: ActionType[]
) {
	rule_actions.forEach(async (action) => {
		let { actionType, discountType, discountValue } = action;
		await Action.create({
			actionType,
			discountType,
			discountValue,
			ruleId: newRule_id,
		});
	});
}

export const verifyUniquePromotionName = (name: string) => {
	return new Promise((resolve, reject) => {
		Promotion.findOne({ where: { name } }).then((promotion) => {
			if (promotion) {
				reject(
					new Error('Name already in use. Please choose another one')
				);
			} else {
				resolve(true);
			}
		});
	});
};
