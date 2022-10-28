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
exports.validateActivatedPromotions = void 0;
const Promotion_1 = require("../models/Promotion");
const validateActivatedPromotions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { activated } = req.body;
    if (activated) {
        const promotions = yield Promotion_1.Promotion.findAll({
            where: {
                activated: true,
            },
        });
        if (promotions.length > 2) {
            return res.status(400).json({
                ok: false,
                msg: 'There are already 3 activated promotions. Please deactivate one before activating a new one.',
            });
        }
    }
    next();
});
exports.validateActivatedPromotions = validateActivatedPromotions;
//# sourceMappingURL=validateActivatedPromotions.js.map