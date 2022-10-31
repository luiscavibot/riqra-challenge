"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dataBase = process.env.NODE_ENV === 'production' ? process.env.DATABASE_NAME : 'riqra';
const user = process.env.NODE_ENV === 'production' ? process.env.DATABASE_USER : 'root';
const password = process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_PASSWORD
    : 'riqra';
const host = process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_HOST
    : 'localhost';
const db = new sequelize_1.Sequelize('test', 'admin', 'oaci12345', {
    host: 'oaci.cp4gcmpufrc5.sa-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    port: 3306,
});
exports.default = db;
//# sourceMappingURL=connection.js.map