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
import { verifyUniquePromotionName } from '../helpers/promotions/createPomotion';
import { actionsType, discountsType } from '../config/actions';

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
		check('name', 'Name be should be unique').custom(
			verifyUniquePromotionName
		),
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

		check('rules.*.actions', 'Rule type should be a array').isArray(),
		check(
			'rules.*.actions.*.actionType',
			`Rule type should be: ${actionsType.join(' or ')}`
		).isIn(actionsType),
		check(
			'rules.*.actions.*.discountType',
			`Rule type should be: ${discountsType.join(' or ')}`
		).isIn(discountsType),

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
		check('name', 'Name already is in use').custom(
			verifyUniquePromotionName
		),
		check('id', 'Id is required').not().isEmpty(),
		check('id', 'Id should be a number').isNumeric(),
		check('rules.*.ruleType', 'Rule type should be a string').isString(),
		check(
			'rules.*.ruleType',
			`ruleType type should be: ${rulesType.join(' or ')}`
		).isIn(rulesType),
		check('rules.*.actions', 'Rule type should be a array').isArray(),
		check(
			'rules.*.actions.*.actionType',
			`actionType type should be: ${actionsType.join(' or ')}`
		).isIn(actionsType),
		check(
			'rules.*.actions.*.discountType',
			`discountType type should be: ${discountsType.join(' or ')}`
		).isIn(discountsType),
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
