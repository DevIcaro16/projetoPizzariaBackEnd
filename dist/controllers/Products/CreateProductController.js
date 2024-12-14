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
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/Products/CreateProductService");
// Cloudinary
const cloudinary_1 = require("cloudinary");
//Configurando o método a partir das credenciais da conta cloudinary (.env)
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class CreateProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, description, category_id } = req.body;
            const createProductService = new CreateProductService_1.CreateProductService();
            // Verifica se o arquivo foi enviado
            if (!req.files || !req.files['file']) {
                throw new Error("Imagem Inválida, Erro ao Realizar o Upload!");
            }
            const file = req.files['file'];
            // Verifica se o arquivo é único ou múltiplo
            if (Array.isArray(file)) {
                throw new Error("Apenas um arquivo é permitido para upload.");
            }
            const resultFile = yield new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader.upload_stream({}, function (error, result) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                }).end(file.data);
            });
            console.log(file); // file é garantido como UploadedFile
            console.log(resultFile);
            // return res.json({});
            // Continuar com a criação do produto
            const product = yield createProductService.execute({
                name,
                price,
                description,
                banner: resultFile.url,
                category_id,
            });
            return res.json(product);
        });
    }
}
exports.CreateProductController = CreateProductController;
