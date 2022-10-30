import { Request, Response } from 'express';
import { FindOptions, Model } from 'sequelize';
import { createRules } from '../helpers/promotions/createPomotion';
import { PromotionType } from '../interfaces/promotions';
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
		async function finalResponse(newPromotion: Model<PromotionType>) {
			return res.status(201).json({
				ok: true,
				data: {
					id: newPromotion.getDataValue('id'),
					...req.body,
				},
				message: 'Promotion created successfully',
			});
		}
		let newPromotion: Model<PromotionType> = await createPromotion();
		await createRules(newPromotion, rules);
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
	const { id } = req.params;
	let query: FindOptions = {
		include: [
			{
				model: Rule,
				include: [
					{
						model: Action,
						attributes: {
							exclude: ['id'],
						},
					},
				],
				attributes: {
					exclude: ['id'],
				},
			},
		],
	};
	id && (query = { ...query, where: { id } });
	const promotions = await Promotion.findAll(query);
	if (promotions.length === 0) {
		return res.status(404).json({
			ok: false,
			msg: 'Promotions not found',
		});
	}
	if (id) {
		return res.json({
			ok: true,
			promotion: promotions[0],
		});
	}
	res.json({
		ok: true,
		promotions,
	});
};

export const updatePromotion = async (req: Request, res: Response) => {
	const { id } = req.params;
	const {
		name,
		activated,
		rules,
		validityPeriodStart,
		validityPeriodExpiration,
	} = req.body;
	try {
		const promotion = await Promotion.findOne({
			where: {
				id,
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
		if (!promotion) {
			return res.status(404).json({
				ok: false,
				msg: 'Promotion not found',
			});
		}
		if (rules?.length > 0) {
			await Rule.destroy({
				where: {
					promotionId: id,
				},
			});
			await Action.destroy({
				where: {
					ruleId: id,
				},
			});
			await createRules(promotion, rules);
		}

		await promotion.update({
			name,
			validityPeriodStart,
			validityPeriodExpiration,
			activated,
		});

		res.json({
			ok: true,
			msg: 'Promotion updated successfully',
			id,
			data: req.body,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact the administrator',
		});
	}
};

export const deletePromotion = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const promotion = await Promotion.findByPk(id);
		if (!promotion) {
			return res.status(404).json({
				ok: false,
				msg: 'Promotion not found',
			});
		}
		await promotion.destroy();
		res.json({
			ok: true,
			msg: 'Promotion deleted successfully',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact the administrator',
		});
	}
};
