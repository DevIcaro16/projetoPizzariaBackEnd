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
exports.DetailsOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailsOrderService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ order_id }) {
            const order = yield prisma_1.default.item.findMany({
                where: {
                    order_id: order_id
                },
                //Inclue nessa resposta as informações / dados dos Models Product e Order 
                //OBS: Isso é possível por conta do Relacionamento entre as 3 tabelas:
                include: {
                    Product: true,
                    Order: true
                }
            });
            return {
                // success: true,
                // message: "Detalhes do Pedido:",
                // items: items
                order
            };
        });
    }
    ;
}
exports.DetailsOrderService = DetailsOrderService;
