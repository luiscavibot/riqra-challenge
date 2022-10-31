"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSubTotal = void 0;
const consts_1 = require("../../config/consts");
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
//# sourceMappingURL=caculateSubtotal.js.map