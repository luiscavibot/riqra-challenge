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
exports.verifyUniquePromotionName = exports.createActions = exports.createRules = void 0;
const Action_1 = require("../../models/Action");
const Promotion_1 = require("../../models/Promotion");
const Rule_1 = require("../../models/Rule");
function createRules(newPromotion, rules) {
    return __awaiter(this, void 0, void 0, function* () {
        rules.forEach((rule) => __awaiter(this, void 0, void 0, function* () {
            let { ruleType, skus, greaterThan } = rule;
            let newRule = yield Rule_1.Rule.create({
                ruleType,
                promotionId: newPromotion.getDataValue('id'),
                skus,
                greaterThan,
            });
            yield createActions(newRule.getDataValue('id'), rule.actions);
        }));
    });
}
exports.createRules = createRules;
function createActions(newRule_id, rule_actions) {
    return __awaiter(this, void 0, void 0, function* () {
        rule_actions.forEach((action) => __awaiter(this, void 0, void 0, function* () {
            let { actionType, discountType, discountValue } = action;
            yield Action_1.Action.create({
                actionType,
                discountType,
                discountValue,
                ruleId: newRule_id,
            });
        }));
    });
}
exports.createActions = createActions;
const verifyUniquePromotionName = (name) => {
    return new Promise((resolve, reject) => {
        Promotion_1.Promotion.findOne({ where: { name } }).then((promotion) => {
            if (promotion) {
                reject(new Error('Name already in use. Please choose another one'));
            }
            else {
                resolve(true);
            }
        });
    });
};
exports.verifyUniquePromotionName = verifyUniquePromotionName;
//# sourceMappingURL=createPomotion.js.map