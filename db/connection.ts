import { Sequelize } from 'sequelize';

const db = new Sequelize('riqra', 'root', 'riqra', {
	host: 'localhost',
	dialect: 'mysql',
	port: 3306,
});

export default db;
