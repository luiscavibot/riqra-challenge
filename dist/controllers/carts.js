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
exports.createCart = void 0;
const consts_1 = require("../config/consts");
const caculateSubtotal_1 = require("../helpers/others/caculateSubtotal");
const promotionEngine_1 = require("../helpers/promotions/promotionEngine");
const createCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lineItems } = req.body;
    const evaluatePromotionsResult = yield (0, promotionEngine_1.evaluatePromotions)(lineItems);
    const sortedTotalDiscounts = evaluatePromotionsResult.sort((a, b) => a.totalDiscount - b.totalDiscount);
    let finaltotalDiscount = 0;
    const subTotal = (0, caculateSubtotal_1.calculateSubTotal)(lineItems);
    let validDiscounts = [];
    let discountAccumulator = 0;
    sortedTotalDiscounts.forEach((discount) => {
        discountAccumulator += discount.totalDiscount;
        if (discountAccumulator > subTotal) {
            return;
        }
        finaltotalDiscount = discountAccumulator;
        validDiscounts.push(discount);
    });
    const lineItemsTotal = lineItems.reduce((acc, lineItem) => {
        return acc + lineItem.qty * lineItem.price;
    }, 0);
    let subtotalWithDiscounts = parseFloat((subTotal - finaltotalDiscount).toFixed(2));
    let taxes = parseFloat((subtotalWithDiscounts * consts_1.TAX).toFixed(2));
    let totalToPay = parseFloat((subtotalWithDiscounts + taxes).toFixed(2));
    return res.status(201).json({
        data: {
            lineItemsTotal,
            discountsList: validDiscounts,
            discountAmount: parseFloat(finaltotalDiscount.toFixed(2)),
            subTotal,
            subtotalWithDiscounts,
            taxes,
            totalToPay,
        },
        message: 'Cart created successfully',
        lineItems,
        ok: true,
    });
});
exports.createCart = createCart;
//# sourceMappingURL=carts.js.map