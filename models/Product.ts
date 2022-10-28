import { DataTypes } from 'sequelize';
import db from '../db/connection';

export const Product = db.define('products', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	sku: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
		defaultValue: 0,
	},
});
