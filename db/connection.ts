import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const dataBase =
	process.env.NODE_ENV === 'production' ? process.env.DATABASE_NAME : 'riqra';
const user =
	process.env.NODE_ENV === 'production' ? process.env.DATABASE_USER : 'root';
const password =
	process.env.NODE_ENV === 'production'
		? process.env.DATABASE_PASSWORD
		: 'riqra';
const host =
	process.env.NODE_ENV === 'production'
		? process.env.DATABASE_HOST
		: 'localhost';

const db = new Sequelize(dataBase!, user!, password, {
	host,
	dialect: 'mysql',
	port: 3306,
});

export default db;
