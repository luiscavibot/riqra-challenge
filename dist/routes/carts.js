"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carts_1 = require("../controllers/carts");
const router = (0, express_1.Router)();
router.post('/', carts_1.createCart);
exports.default = router;
//# sourceMappingURL=carts.js.map