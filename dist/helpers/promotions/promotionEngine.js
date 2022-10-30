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
exports.evaluatePromotions = void 0;
const sequelize_1 = require("sequelize");
const Promotion_1 = require("../../models/Promotion");
const Rule_1 = require("../../models/Rule");
const Action_1 = require("../../models/Action");
const validateRuleType_1 = require("./validateRuleType");
const aplicateAction_1 = require("./aplicateAction");
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
function evaluateRules(validatedPromotions, lineItems) {
    let evaluateRulesResponse = [];
    validatedPromotions.forEach((promotion) => {
        console.log('promotion!!');
        promotion.getDataValue('rules').forEach((rule) => {
            let { ruleType, skus, greaterThan } = rule.dataValues;
            let isValidatedRule = (0, validateRuleType_1.validateRuleType)(ruleType, skus, greaterThan, lineItems);
            if (isValidatedRule) {
                let totalDiscount = (0, aplicateAction_1.aplicateActions)(rule.actions, lineItems);
                evaluateRulesResponse.push({
                    promotionName: promotion.getDataValue('name'),
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