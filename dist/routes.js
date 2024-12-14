"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//Arquivo de roteamento com o Express:
const express_1 = require("express");
//Importando o arquivo que lida com o processamento das imgs:
const multer_1 = __importDefault(require("multer"));
//Importando os Controllers para utilizá-los nas rotas:
const CreateUserController_1 = require("./controllers/User/CreateUserController");
const AuthUserController_1 = require("./controllers/User/AuthUserController");
const DetailUserController_1 = require("./controllers/User/DetailUserController");
const isAutrhenticate_1 = require("./middlewares/isAutrhenticate");
const CreateCategoryController_1 = require("./controllers/Category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/Category/ListCategoryController");
const CreateProductController_1 = require("./controllers/Products/CreateProductController");
const multer_2 = __importDefault(require("./config/multer"));
const ListByCategoryController_1 = require("./controllers/Products/ListByCategoryController");
const CreateOrderController_1 = require("./controllers/Orders/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/Orders/RemoveOrderController");
const AddItemsController_1 = require("./controllers/Orders/AddItemsController");
const RemoveItemsController_1 = require("./controllers/Orders/RemoveItemsController");
const SendOrderController_1 = require("./controllers/Orders/SendOrderController");
const ListOrdersController_1 = require("./controllers/Orders/ListOrdersController");
const DetailsOrderController_1 = require("./controllers/Orders/DetailsOrderController");
const FinishOrderController_1 = require("./controllers/Orders/FinishOrderController");
//Importando o Middleware:
const router = (0, express_1.Router)();
exports.router = router;
//Variável (Middleware) que guardará o upload do arquivo :
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp")); //Passando o diretório como parãmetro.
//Routas:
//Rotas referentes as ações de usuário:
//Rota de Cadastro:
router.post("/users", new CreateUserController_1.CreateUserController().handle);
//Rota de Login:
router.post('/session', new AuthUserController_1.AuthUserController().handle);
//Middleware -> serviço de autenticação.
//Utilizá-lo em todas as rotas privadas:
router.get('/me', isAutrhenticate_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle); //Todo Middleware é utilizado como parâmetro na linha da routa.
//Rotas referentes as categorias:
//Rota de cadastro:
router.post('/category', isAutrhenticate_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
//Rota de busca (todos os registros):
router.get('/categories', isAutrhenticate_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
//Rotas referentes aos Produtos:
//Rota de cadastro:
// router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.post('/product', isAutrhenticate_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle);
router.get('/category/products', isAutrhenticate_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
//Rotas referentes as ordes -> Comandas / Pedidos:
//Rota de Cadastro:
router.post('/order', isAutrhenticate_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
//Rota de deleção:
router.delete('/order', isAutrhenticate_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
//Rota para adicionar um Item (pedido) na Order (Comanda):
router.post('/order/addItem', isAutrhenticate_1.isAuthenticated, new AddItemsController_1.AddItemsController().handle);
//Rota para deletar um Item de uma Comanda:
router.delete('/order/removeItem', isAutrhenticate_1.isAuthenticated, new RemoveItemsController_1.RemoveItemsController().handle);
//Rota para concluir / Enviar a order (pedido):
router.put('/order/sendOrder', isAutrhenticate_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
//Rota para listar as orders (pedidos) que foram concluídos (não estão em rascunho):
router.get('/order/listOrders', isAutrhenticate_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle);
//Rota para resgatar os Detalhes do Pedido:
router.get('/order/detailsOrder', isAutrhenticate_1.isAuthenticated, new DetailsOrderController_1.DetailsOrderController().handle);
//Rota para finalizar a order (Pedido):
router.put('/order/finish', isAutrhenticate_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
