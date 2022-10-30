import { Router } from 'express';
import {
	createPromotion,
	deletePromotion,
	getPromotions,
	updatePromotion,
} from '../controllers/promotions';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import { validatePeriod } from '../middlewares/validatePeriod';
import { validateActivatedPromotions } from '../middlewares/validateActivatedPromotions';
import { rulesType } from '../config/rules';
import { Promotion } from '../models/Promotion';

const router = Router();

router.get('/', getPromotions);
router.get(
	'/:id',
	[
		check('id', 'Id is required').not().isEmpty(),
		check('id', 'Id should be a number').isNumeric(),
		validateFields,
	],
	getPromotions
);

router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('name', 'Name be should be unique').custom((name) => {
			return new Promise((resolve, reject) => {
				Promotion.findOne({ where: { name } }).then((promotion) => {
					if (promotion) {
						reject(
							new Error(
								'Name already in use. Please choose another one'
							)
						);
					} else {
						resolve(true);
					}
				});
			});
		}),
		check('name', 'Name should have minimum 3 characters').isLength({
			min: 3,
		}),
		check('name', 'Name should have maximum 15 characters').isLength({
			max: 15,
		}),
		check('validityPeriodStart', 'Validity period start is required')
			.not()
			.isEmpty(),
		check(
			'validityPeriodExpiration',
			'Validity period expiration is required'
		)
			.not()
			.isEmpty(),
		validatePeriod,
		validateActivatedPromotions,
		check('rules', 'Rules are required').not().isEmpty(),
		check('rules', 'Rules should be an array').isArray(),
		check('rules.*.ruleType', 'Rule type is required').not().isEmpty(),
		check('rules.*.ruleType', 'Rule type should be a string').isString(),
		check(
			'rules.*.ruleType',
			`Rule type should be: ${rulesType.join(' or ')}`
		).isIn(rulesType),
		check('rules.*.actions', 'Actions are required').not().isEmpty(),
		check('rules.*.actions', 'Actions should be an array').isArray(),
		check('rules.*.actions', 'Actions should be greater than 0').isLength({
			min: 1,
		}),
		validateFields,
	],
	createPromotion
);

router.put(
	'/:id',
	[
		check('id', 'Id is required').not().isEmpty(),
		check('id', 'Id should be a number').isNumeric(),
		validatePeriod,
		validateActivatedPromotions,
		validateFields,
	],
	updatePromotion
);
router.delete(
	'/:id',
	[check('id', 'Id is required').not().isEmpty(), validateFields],
	deletePromotion
);
export default router;
