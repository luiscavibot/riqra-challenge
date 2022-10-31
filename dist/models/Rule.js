"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
const sequelize_1 = require("sequelize");
const rules_1 = require("../config/rules");
const connection_1 = __importDefault(require("../db/connection"));
const Action_1 = require("./Action");
exports.Rule = connection_1.default.define('rules', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ruleType: {
        type: sequelize_1.DataTypes.ENUM,
        values: rules_1.rulesType,
    },
    skus: {
        type: sequelize_1.DataTypes.JSON,
        defaultValue: null,
    },
    greaterThan: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: null,
    },
}, {
    timestamps: false,
});
exports.Rule.hasMany(Action_1.Action, {
    foreignKey: 'ruleId',
});
Action_1.Action.belongsTo(exports.Rule);
//# sourceMappingURL=Rule.js.map