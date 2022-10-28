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
exports.getPromotions = exports.createPromotion = void 0;
const Action_1 = require("../models/Action");
const Promotion_1 = require("../models/Promotion");
const Rule_1 = require("../models/Rule");
const createPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, rules, validityPeriodStart, validityPeriodExpiration, activated, } = req.body;
    try {
        function createPromotion() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promotion_1.Promotion.create({
                    name,
                    rules,
                    validityPeriodStart,
                    validityPeriodExpiration,
                    activated,
                });
            });
        }
        function createRules(newPromotion) {
            return __awaiter(this, void 0, void 0, function* () {
                rules.forEach((rule) => __awaiter(this, void 0, void 0, function* () {
                    let { ruleType } = rule;
                    let newRule = yield Rule_1.Rule.create({
                        ruleType,
                        promotionId: newPromotion.id,
                    });
                    yield createActions(newRule.id, rule.actions);
                }));
            });
        }
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
        function finalResponse(newPromotion) {
            return __awaiter(this, void 0, void 0, function* () {
                return res.status(201).json({
                    ok: true,
                    data: newPromotion,
                    message: 'Promotion created successfully',
                });
            });
        }
        let newPromotion = yield createPromotion();
        yield createRules(newPromotion);
        yield finalResponse(newPromotion);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.createPromotion = createPromotion;
const getPromotions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promotions = yield Promotion_1.Promotion.findAll({
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
    res.json({
        ok: true,
        promotions,
    });
});
exports.getPromotions = getPromotions;
//# sourceMappingURL=promotions.js.map