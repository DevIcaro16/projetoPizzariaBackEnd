import { Request, Response, response } from "express";

//Importando o service:

import { CreateUserService } from "../../services/User/CreateUserService";


//Classe Controller:
class CreateUserController {

      async handle(req: Request, res: Response){

        // console.log(req.body);

        //Resgatando os dados inseridos no envio da requisição (req):

        const {name, email, password} = req.body;

        //Instância do Service do user:

        const createUserService = new CreateUserService();
        
        //Variável que guardará o resultado do método do service do user:

        const user = await createUserService.execute({
            name,
            email,
            password
        }); //await para ele aguardar o carregamento das informações do método.

        //Retorna essa variável em json:

        return res.json(user);

      }
}

//Exportação (para utilizar em demais arquivos):

export {CreateUserController}