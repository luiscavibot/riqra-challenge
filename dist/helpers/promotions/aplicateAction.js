"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aplicateActions = void 0;
const actions_1 = require("../../config/actions");
const caculateSubtotal_1 = require("../others/caculateSubtotal");
function aplicatePercentageDiscountType(subtotal, discountValue) {
    let totalDiscount = (subtotal * discountValue) / 100;
    return parseFloat(totalDiscount.toFixed(2));
}
function aplicateFixedDiscountType(discountValue) {
    return discountValue;
}
function aplicateCartDiscountActionType(discountType, lineItems, discountValue) {
    if (discountType === actions_1.discountsType[0]) {
        let subtotal = (0, caculateSubtotal_1.calculateSubTotal)(lineItems);
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
exports.aplicateActions = aplicateActions;
//# sourceMappingURL=aplicateAction.js.map