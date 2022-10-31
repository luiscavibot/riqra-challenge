"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dataBase = process.env.NODE_ENV === 'production' ? process.env.DATABASE_NAME : 'riqra';
const user = process.env.NODE_ENV === 'production' ? process.env.DATABASE_USER : 'root';
const password = process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_PASSWORD
    : 'riqra';
const host = process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_HOST
    : 'localhost';
const db = new sequelize_1.Sequelize(dataBase, user, password, {
    host,
    dialect: 'mysql',
    port: 3306,
});
exports.default = db;
//# sourceMappingURL=connection.js.map