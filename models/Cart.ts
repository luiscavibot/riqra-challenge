import { DataTypes } from 'sequelize';
import db from '../db/connection';

export const Promotion = db.define('carts', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
});
