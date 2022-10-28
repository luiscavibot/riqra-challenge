import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Action } from '../models/Action';
import { Promotion } from '../models/Promotion';
import { Rule } from '../models/Rule';

export const createPromotion = async (req: Request, res: Response) => {
	const {
		name,
		rules,
		validityPeriodStart,
		validityPeriodExpiration,
		activated,
		skus,
		greaterThan,
	} = req.body;
	try {
		async function createPromotion() {
			return await Promotion.create({
				name,
				rules,
				validityPeriodStart,
				validityPeriodExpiration,
				activated,
			});
		}
		async function createRules(newPromotion: any) {
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

		async function createActions(newRule_id: any, rule_actions: any) {
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

		async function finalResponse(newPromotion: any) {
			return res.status(201).json({
				ok: true,
				data: newPromotion,
				message: 'Promotion created successfully',
			});
		}
		let newPromotion = await createPromotion();
		await createRules(newPromotion);
		await finalResponse(newPromotion);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact the administrator',
		});
	}
};

export const getPromotions = async (req: Request, res: Response) => {
	const promotions = await Promotion.findAll({
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
	res.json({
		ok: true,
		promotions,
	});
};
