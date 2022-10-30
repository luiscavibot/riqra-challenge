"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRuleType = void 0;
const rules_1 = require("../../config/rules");
const caculateSubtotal_1 = require("../others/caculateSubtotal");
function validateProductSelectorRuleType(skus, lineItems) {
    let lineItemsSkus = lineItems.map((lineItem) => lineItem.sku);
    let isMatchWithSkusPromotion = lineItemsSkus.every((sku) => skus.includes(sku));
    return isMatchWithSkusPromotion;
}
function validateCartTotalRuleType(greaterThan, lineItems) {
    const lineItemsTotal = (0, caculateSubtotal_1.calculateSubTotal)(lineItems);
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
exports.validateRuleType = validateRuleType;
//# sourceMappingURL=validateRuleType.js.map