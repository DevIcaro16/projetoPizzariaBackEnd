"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
// Biblioteca / Métodos nativos do NODE -> lidar com arquivos: 
const path_1 = require("path");
exports.default = {
    //Método que irá salvar a img:
    upload(folder) {
        return {
            storage: multer_1.default.diskStorage({
                //Pasta de destino (TMP):
                destination: (0, path_1.resolve)(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    //Criptografia do arquivo:
                    const fileHash = crypto_1.default.randomBytes(16).toString("hex");
                    //Nome gerado para o arquivo:
                    const fileName = `${fileHash}-${file.originalname}`;
                    //Retorno (garatindo que nunca se repitirá):
                    return callback(null, fileName);
                }
            })
        };
    }
};
