"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePeriod = void 0;
const validatePeriod = (req, res, next) => {
    const { validityPeriodStart, validityPeriodExpiration } = req.body;
    if (validityPeriodStart > validityPeriodExpiration) {
        return res.status(400).json({
            ok: false,
            msg: 'Validity period start should be less than validity period expiration',
        });
    }
    next();
};
exports.validatePeriod = validatePeriod;
//# sourceMappingURL=validatePeriod.js.map