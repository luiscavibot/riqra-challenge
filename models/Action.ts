import { DataTypes } from 'sequelize';
import { actionsType, discountsType } from '../config/actions';
import db from '../db/connection';

export const Action = db.define(
	'actions',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		actionType: {
			type: DataTypes.ENUM,
			values: actionsType,
		},
		discountType: {
			type: DataTypes.ENUM,
			values: discountsType,
		},
		discountValue: {
			type: DataTypes.FLOAT,
			defaultValue: null,
		},
	},
	{
		timestamps: false,
	}
);
