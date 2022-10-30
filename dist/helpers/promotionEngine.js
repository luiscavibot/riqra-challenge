"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluatePromotions = exports.calculateSubTotal = void 0;
const sequelize_1 = require("sequelize");
const rules_1 = require("../config/rules");
const actions_1 = require("../config/actions");
const consts_1 = require("../config/consts");
const Promotion_1 = require("../models/Promotion");
const Rule_1 = require("../models/Rule");
const Action_1 = require("../models/Action");
function getValidPromotions() {
    return __awaiter(this, void 0, void 0, function* () {
        const promotions = yield Promotion_1.Promotion.findAll({
            where: {
                activated: true,
                validityPeriodStart: {
                    [sequelize_1.Op.lte]: new Date(),
                },
                validityPeriodExpiration: {
                    [sequelize_1.Op.gte]: new Date(),
                },
            },
            include: [
                {
                    model: Rule_1.Rule,
                    include: [
                        {
                            model: Action_1.Action,
                        },
                    ],
                },
            ],
        });
        return promotions;
    });
}
function calculateTotal(lineItems) {
    const lineItemsTotal = lineItems.reduce((acc, lineItem) => {
        return acc + lineItem.qty * lineItem.price;
    }, 0);
    return lineItemsTotal;
}
function aplicatePercentageDiscountType(subtotal, discountValue) {
    let totalDiscount = (subtotal * discountValue) / 100;
    return parseFloat(totalDiscount.toFixed(2));
}
function aplicateFixedDiscountType(discountValue) {
    return discountValue;
}
function calculateSubTotal(lineItems) {
    const lineItemsTotal = lineItems.reduce((acc, lineItem) => {
        return acc + lineItem.qty * lineItem.price;
    }, 0);
    // const taxes = parseFloat((lineItemsTotal * TAX).toFixed(2));
    // const subTotal = parseFloat((lineItemsTotal - taxes).toFixed(2));
    const subTotal = parseFloat((lineItemsTotal / (1 + consts_1.TAX)).toFixed(2));
    return subTotal;
}
exports.calculateSubTotal = calculateSubTotal;
function aplicateCartDiscountActionType(discountType, lineItems, discountValue) {
    if (discountType === actions_1.discountsType[0]) {
        let subtotal = calculateSubTotal(lineItems);
        return aplicatePercentageDiscountType(subtotal, discountValue);
    }
    if (discountType === actions_1.discountsType[1]) {
        return aplicateFixedDiscountType(discountValue);
    }
}
function aplicateActions(actions, lineItems) {
    let totalDiscount = 0;
    actions.forEach((action) => {
        let { actionType, discountType, discountValue } = action.dataValues;
        if (actionType === actions_1.actionsType[0]) {
            totalDiscount += aplicateCartDiscountActionType(discountType, lineItems, discountValue);
        }
    });
    return totalDiscount;
}
function validateProductSelectorRuleType(skus, lineItems) {
    let lineItemsSkus = lineItems.map((lineItem) => lineItem.sku);
    let isMatchWithSkusPromotion = lineItemsSkus.every((sku) => skus.includes(sku));
    return isMatchWithSkusPromotion;
}
function validateCartTotalRuleType(greaterThan, lineItems) {
    const lineItemsTotal = calculateTotal(lineItems);
    if (lineItemsTotal > greaterThan) {
        return true;
    }
    return false;
}
function validateRuleType(ruleType, skus, greaterThan, lineItems) {
    if (ruleType === rules_1.rulesType[0]) {
        return validateProductSelectorRuleType(skus, lineItems);
    }
    if (ruleType === rules_1.rulesType[1]) {
        return validateCartTotalRuleType(greaterThan, lineItems);
    }
    return false;
}
function evaluateRules(validatedPromotions, lineItems) {
    let evaluateRulesResponse = [];
    validatedPromotions.forEach((promotion) => {
        promotion.dataValues.rules.forEach((rule) => {
            let { ruleType, skus, greaterThan } = rule.dataValues;
            let isValidatedRule = validateRuleType(ruleType, skus, greaterThan, lineItems);
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
const evaluatePromotions = (lineItems) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedPromotions = yield getValidPromotions();
        let evaluateRulesResponse = evaluateRules(validatedPromotions, lineItems);
        return evaluateRulesResponse;
    }
    catch (error) {
        console.log(error);
    }
});
exports.evaluatePromotions = evaluatePromotions;
//# sourceMappingURL=promotionEngine.js.map