"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promotions_1 = require("../controllers/promotions");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const validatePeriod_1 = require("../middlewares/validatePeriod");
const router = (0, express_1.Router)();
router.get('/', promotions_1.getPromotions);
router.post('/', [
    (0, express_validator_1.check)('name', 'Name is required').not().isEmpty(),
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
    validateFields_1.validateFields,
], promotions_1.createPromotion);
exports.default = router;
//# sourceMappingURL=promotions.js.map