import { Router } from 'express';
import { createPromotion, getPromotions } from '../controllers/promotions';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import { validatePeriod } from '../middlewares/validatePeriod';
import { validateActivatedPromotions } from '../middlewares/validateActivatedPromotions';

const router = Router();

router.get('/', getPromotions);

router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
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
		validateFields,
	],
	createPromotion
);

export default router;
