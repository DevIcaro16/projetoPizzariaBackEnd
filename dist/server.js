"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
//Por algum motivo, a ordem da importação do arquivo de rotas bagunçou o throw new Err().     
//OBS: Deixar ele abaixo do import acima (empress-async-erros).
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: {
        fileSize: 50 * 1024 * 1024
    }
}));
app.use(routes_1.router);
app.get("/", (req, res) => {
    return res.json({
        owner: "ÍCARUS"
    });
    // throw new Error("Erro na Requisição!");
});
// Rota estática para ter acesso aos arquivos salvos no servidor (Middleware):
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        //Se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(3200, () => {
    console.log(`Servidor da Aplicação Rodando na Porta: ${port}`);
});
