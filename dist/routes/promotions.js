"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promotions_1 = require("../controllers/promotions");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const validatePeriod_1 = require("../middlewares/validatePeriod");
const validateActivatedPromotions_1 = require("../middlewares/validateActivatedPromotions");
const rules_1 = require("../config/rules");
const createPomotion_1 = require("../helpers/promotions/createPomotion");
const actions_1 = require("../config/actions");
const router = (0, express_1.Router)();
router.get('/', promotions_1.getPromotions);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'Id is required').not().isEmpty(),
    (0, express_validator_1.check)('id', 'Id should be a number').isNumeric(),
    validateFields_1.validateFields,
], promotions_1.getPromotions);
router.post('/', [
    (0, express_validator_1.check)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.check)('name', 'Name be should be unique').custom(createPomotion_1.verifyUniquePromotionName),
    (0, express_validator_1.check)('name', 'Name should have minimum 3 characters').isLength({
        min: 3,
    }),
    (0, express_validator_1.check)('name', 'Name should have maximum 15 characters').isLength({
        max: 15,
    }),
    (0, express_validator_1.check)('validityPeriodStart', 'Validity period start is required')
        .not()
        .isEmpty(),
    (0, express_validator_1.check)('validityPeriodExpiration', 'Validity period expiration is required')
        .not()
        .isEmpty(),
    validatePeriod_1.validatePeriod,
    validateActivatedPromotions_1.validateActivatedPromotions,
    (0, express_validator_1.check)('rules', 'Rules are required').not().isEmpty(),
    (0, express_validator_1.check)('rules', 'Rules should be an array').isArray(),
    (0, express_validator_1.check)('rules.*.ruleType', 'Rule type is required').not().isEmpty(),
    (0, express_validator_1.check)('rules.*.ruleType', 'Rule type should be a string').isString(),
    (0, express_validator_1.check)('rules.*.ruleType', `Rule type should be: ${rules_1.rulesType.join(' or ')}`).isIn(rules_1.rulesType),
    (0, express_validator_1.check)('rules.*.actions', 'Rule type should be a array').isArray(),
    (0, express_validator_1.check)('rules.*.actions.*.actionType', `Rule type should be: ${actions_1.actionsType.join(' or ')}`).isIn(actions_1.actionsType),
    (0, express_validator_1.check)('rules.*.actions.*.discountType', `Rule type should be: ${actions_1.discountsType.join(' or ')}`).isIn(actions_1.discountsType),
    (0, express_validator_1.check)('rules.*.actions', 'Actions are required').not().isEmpty(),
    (0, express_validator_1.check)('rules.*.actions', 'Actions should be an array').isArray(),
    (0, express_validator_1.check)('rules.*.actions', 'Actions should be greater than 0').isLength({
        min: 1,
    }),
    validateFields_1.validateFields,
], promotions_1.createPromotion);
router.put('/:id', [
    (0, express_validator_1.check)('name', 'Name already is in use').custom(createPomotion_1.verifyUniquePromotionName),
    (0, express_validator_1.check)('id', 'Id is required').not().isEmpty(),
    (0, express_validator_1.check)('id', 'Id should be a number').isNumeric(),
    (0, express_validator_1.check)('rules.*.ruleType', 'Rule type should be a string').isString(),
    (0, express_validator_1.check)('rules.*.ruleType', `Rule type should be: ${rules_1.rulesType.join(' or ')}`).isIn(rules_1.rulesType),
    (0, express_validator_1.check)('rules.*.actions', 'Rule type should be a array').isArray(),
    (0, express_validator_1.check)('rules.*.actions.*.actionType', `Rule type should be: ${actions_1.actionsType.join(' or ')}`).isIn(actions_1.actionsType),
    (0, express_validator_1.check)('rules.*.actions.*.discountType', `Rule type should be: ${actions_1.discountsType.join(' or ')}`).isIn(actions_1.discountsType),
    validatePeriod_1.validatePeriod,
    validateActivatedPromotions_1.validateActivatedPromotions,
    validateFields_1.validateFields,
], promotions_1.updatePromotion);
router.delete('/:id', [(0, express_validator_1.check)('id', 'Id is required').not().isEmpty(), validateFields_1.validateFields], promotions_1.deletePromotion);
exports.default = router;
//# sourceMappingURL=promotions.js.map