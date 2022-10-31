import express, { Application } from 'express';
import promotionRoutes from '../routes/promotions';
import cartsRoutes from '../routes/carts';
import productsRoutes from '../routes/products';
import cors from 'cors';
import db from '../db/connection';
import { generalPath } from '../config/general';
class Server {
	public app: Application;
	private port: string;
	private apiPaths = {
		promotions: 'promotions',
		carts: 'carts',
		products: 'products',
	};

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '8000';
		this.middlewares();
		this.routes();
		this.dbConnection();
	}
	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static('public'));
	}
	async dbConnection() {
		try {
			await db.authenticate();
			await db.sync();
			console.log('Database online');
		} catch (error) {
			console.error(error);
		}
	}
	routes() {
		this.app.use(generalPath + this.apiPaths.promotions, promotionRoutes);
		this.app.use(generalPath + this.apiPaths.carts, cartsRoutes);
		this.app.use(generalPath + this.apiPaths.products, productsRoutes);
	}
	listen() {
		this.app.listen(this.port, () => {
			console.log('Server running on port ' + this.port);
		});
	}
}
export default Server;
