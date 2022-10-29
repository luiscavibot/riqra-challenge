import { DataTypes } from 'sequelize';
import db from '../db/connection';
import { Rule } from './Rule';

export const Promotion = db.define('promotions', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},

	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	validityPeriodStart: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	validityPeriodExpiration: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	activated: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

Promotion.hasMany(Rule, {
	foreignKey: 'promotionId',
});

Rule.belongsTo(Promotion);
