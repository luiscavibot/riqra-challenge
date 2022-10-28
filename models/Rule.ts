import { DataTypes } from 'sequelize';
import { rulesType } from '../config/rules';
import db from '../db/connection';
import { Action } from './Action';

export const Rule = db.define(
	'rules',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		ruleType: {
			type: DataTypes.ENUM,
			values: rulesType,
		},
	},
	{
		timestamps: false,
	}
);

Rule.hasMany(Action, {
	foreignKey: 'ruleId',
});

Action.belongsTo(Rule);
