import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('Usuario', {
	nombre: {
		type: DataTypes.STRING,
		defaultValue: 'Sin nombre',
	},
	correo: {
		type: DataTypes.STRING,
		unique: true,
		defaultValue: 'Sin email',
	},
	estado: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
});

export default Usuario;
