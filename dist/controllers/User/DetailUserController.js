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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailUserController = void 0;
const DataUserService_1 = require("../../services/User/DataUserService");
class DetailUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user_id;
            console.log(`ID DO USER: ${user_id}`);
            const detalUserService = new DataUserService_1.DataUserService();
            const user = yield detalUserService.execute(user_id); //Passando o id do user para o método do Service.
            return res.status(201).json({
                User: user
            });
        });
    }
}
exports.DetailUserController = DetailUserController;
