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
exports.deletePromotion = exports.updatePromotion = exports.getPromotions = exports.createPromotion = void 0;
const createPomotion_1 = require("../helpers/promotions/createPomotion");
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
        function finalResponse(newPromotion) {
            return __awaiter(this, void 0, void 0, function* () {
                return res.status(201).json({
                    ok: true,
                    data: Object.assign({ id: newPromotion.getDataValue('id') }, req.body),
                    message: 'Promotion created successfully',
                });
            });
        }
        let newPromotion = yield createPromotion();
        yield (0, createPomotion_1.createRules)(newPromotion, rules);
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
    const { id } = req.params;
    let query = {
        include: [
            {
                model: Rule_1.Rule,
                include: [
                    {
                        model: Action_1.Action,
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
    id && (query = Object.assign(Object.assign({}, query), { where: { id } }));
    const promotions = yield Promotion_1.Promotion.findAll(query);
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
});
exports.getPromotions = getPromotions;
const updatePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, activated, rules, validityPeriodStart, validityPeriodExpiration, } = req.body;
    try {
        const promotion = yield Promotion_1.Promotion.findOne({
            where: {
                id,
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
        if (!promotion) {
            return res.status(404).json({
                ok: false,
                msg: 'Promotion not found',
            });
        }
        if ((rules === null || rules === void 0 ? void 0 : rules.length) > 0) {
            yield Rule_1.Rule.destroy({
                where: {
                    promotionId: id,
                },
            });
            yield Action_1.Action.destroy({
                where: {
                    ruleId: id,
                },
            });
            yield (0, createPomotion_1.createRules)(promotion, rules);
        }
        yield promotion.update({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.updatePromotion = updatePromotion;
const deletePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const promotion = yield Promotion_1.Promotion.findByPk(id);
        if (!promotion) {
            return res.status(404).json({
                ok: false,
                msg: 'Promotion not found',
            });
        }
        yield promotion.destroy();
        res.json({
            ok: true,
            msg: 'Promotion deleted successfully',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.deletePromotion = deletePromotion;
//# sourceMappingURL=promotions.js.map