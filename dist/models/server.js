"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promotions_1 = __importDefault(require("../routes/promotions"));
const carts_1 = __importDefault(require("../routes/carts"));
const products_1 = __importDefault(require("../routes/products"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const general_1 = require("../config/general");
class Server {
    constructor() {
        this.apiPaths = {
            promotions: 'promotions',
            carts: 'carts',
            products: 'products',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes();
        this.dbConnection();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                yield connection_1.default.sync();
                console.log('Database online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    routes() {
        this.app.use(general_1.generalPath + this.apiPaths.promotions, promotions_1.default);
        this.app.use(general_1.generalPath + this.apiPaths.carts, carts_1.default);
        this.app.use(general_1.generalPath + this.apiPaths.products, products_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map