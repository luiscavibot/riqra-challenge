import express, { Application } from 'express';
import promotionRoutes from '../routes/promotions';
import cartsRoutes from '../routes/carts';
import productsRoutes from '../routes/products';
import cors from 'cors';
import db from '../db/connection';
class Server {
	private app: Application;
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
		// CORS
		this.app.use(cors());
		// Lectura y parseo del body
		this.app.use(express.json());
		// Directorio público
		this.app.use(express.static('public'));
	}
	async dbConnection() {
		try {
			await db.authenticate();
			await db.sync();
			console.log('Database online');
		} catch (error: any) {
			throw new Error(error);
		}
	}
	routes() {
		this.app.use('/api/v1/' + this.apiPaths.promotions, promotionRoutes);
		this.app.use('/api/v1/' + this.apiPaths.carts, cartsRoutes);
		this.app.use('/api/v1/' + this.apiPaths.products, productsRoutes);
	}
	listen() {
		this.app.listen(this.port, () => {
			console.log('Server running on port ' + this.port);
		});
	}
}
export default Server;
