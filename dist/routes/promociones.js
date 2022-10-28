"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promotions_1 = require("../controllers/promotions");
const router = (0, express_1.Router)();
router.post('/', promotions_1.createPromotion);
exports.default = router;
//# sourceMappingURL=promociones.js.map