//Arquivo de roteamento com o Express:
import { Router } from "express"; 
import { Request, Response } from "express";


//Importando o arquivo que lida com o processamento das imgs:
import multer from "multer";

//Importando os Controllers para utilizá-los nas rotas:

import { CreateUserController } from "./controllers/User/CreateUserController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { DetailUserController } from "./controllers/User/DetailUserController";
import { isAuthenticated } from "./middlewares/isAutrhenticate";
import { CreateCategoryController } from "./controllers/Category/CreateCategoryController";
import { ListCategoryController } from "./controllers/Category/ListCategoryController";
import { CreateProductController } from "./controllers/Products/CreateProductController";
import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/Products/ListByCategoryController";
import { CreateOrderController } from "./controllers/Orders/CreateOrderController";
import { RemoveOrderController } from "./controllers/Orders/RemoveOrderController";
import { AddItemsController } from "./controllers/Orders/AddItemsController";
import { RemoveItemsController } from "./controllers/Orders/RemoveItemsController";
import { SendOrderController } from "./controllers/Orders/SendOrderController";
import { ListOrdersController } from "./controllers/Orders/ListOrdersController";
import { DetailsOrderController } from "./controllers/Orders/DetailsOrderController";
import { FinishOrderController } from "./controllers/Orders/FinishOrderController";

//Importando o Middleware:

const router = Router();

//Variável (Middleware) que guardará o upload do arquivo :

const upload = multer(uploadConfig.upload("./tmp")); //Passando o diretório como parãmetro.

//Routas:


//Rotas referentes as ações de usuário:
 
//Rota de Cadastro:
router.post("/users", new CreateUserController().handle);

//Rota de Login:
router.post('/session', new AuthUserController().handle);

//Middleware -> serviço de autenticação.
//Utilizá-lo em todas as rotas privadas:

router.get('/me', isAuthenticated ,new DetailUserController().handle); //Todo Middleware é utilizado como parâmetro na linha da routa.

//Rotas referentes as categorias:

//Rota de cadastro:
router.post('/category', isAuthenticated, new CreateCategoryController().handle);

//Rota de busca (todos os registros):
router.get('/categories', isAuthenticated, new ListCategoryController().handle);


//Rotas referentes aos Produtos:

//Rota de cadastro:

// router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);

router.post('/product', isAuthenticated, new CreateProductController().handle);

router.get('/category/products', isAuthenticated , new ListByCategoryController().handle);




//Rotas referentes as ordes -> Comandas / Pedidos:


//Rota de Cadastro:
router.post('/order', isAuthenticated, new CreateOrderController().handle);


//Rota de deleção:
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);

//Rota para adicionar um Item (pedido) na Order (Comanda):

router.post('/order/addItem', isAuthenticated, new AddItemsController().handle);

//Rota para deletar um Item de uma Comanda:

router.delete('/order/removeItem', isAuthenticated, new RemoveItemsController().handle);


//Rota para concluir / Enviar a order (pedido):
router.put('/order/sendOrder', isAuthenticated, new SendOrderController().handle);

//Rota para listar as orders (pedidos) que foram concluídos (não estão em rascunho):

router.get('/order/listOrders', isAuthenticated, new ListOrdersController().handle);


//Rota para resgatar os Detalhes do Pedido:

router.get('/order/detailsOrder', isAuthenticated, new DetailsOrderController().handle);



//Rota para finalizar a order (Pedido):

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);


export {router};
