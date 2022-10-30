import { Action } from '../../models/Action';
import { Rule } from '../../models/Rule';

export async function createRules(newPromotion: any, rules: any) {
	rules.forEach(async (rule: any) => {
		let { ruleType, skus, greaterThan } = rule;
		let newRule: any = await Rule.create({
			ruleType,
			promotionId: newPromotion.id,
			skus,
			greaterThan,
		});
		await createActions(newRule.id, rule.actions);
	});
}

export async function createActions(newRule_id: any, rule_actions: any) {
	rule_actions.forEach(async (action: any) => {
		let { actionType, discountType, discountValue } = action;
		await Action.create({
			actionType,
			discountType,
			discountValue,
			ruleId: newRule_id,
		});
	});
}
