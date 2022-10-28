"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promotion = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Rule_1 = require("./Rule");
exports.Promotion = connection_1.default.define('promotions', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    validityPeriodStart: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    validityPeriodExpiration: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
});
exports.Promotion.hasMany(Rule_1.Rule, {
    foreignKey: 'promotionId',
});
Rule_1.Rule.belongsTo(exports.Promotion);
//# sourceMappingURL=Promotion.js.map