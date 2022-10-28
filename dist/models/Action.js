"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const sequelize_1 = require("sequelize");
const actions_1 = require("../config/actions");
const connection_1 = __importDefault(require("../db/connection"));
exports.Action = connection_1.default.define('actions', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    actionType: {
        type: sequelize_1.DataTypes.ENUM,
        values: actions_1.actionsType,
    },
    discountType: {
        type: sequelize_1.DataTypes.ENUM,
        values: actions_1.discountsType,
    },
    discountValue: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: null,
    },
}, {
    timestamps: false,
});
//# sourceMappingURL=Action.js.map