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
exports.CreateUserController = void 0;
//Importando o service:
const CreateUserService_1 = require("../../services/User/CreateUserService");
//Classe Controller:
class CreateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body);
            //Resgatando os dados inseridos no envio da requisição (req):
            const { name, email, password } = req.body;
            //Instância do Service do user:
            const createUserService = new CreateUserService_1.CreateUserService();
            //Variável que guardará o resultado do método do service do user:
            const user = yield createUserService.execute({
                name,
                email,
                password
            }); //await para ele aguardar o carregamento das informações do método.
            //Retorna essa variável em json:
            return res.json(user);
        });
    }
}
exports.CreateUserController = CreateUserController;
