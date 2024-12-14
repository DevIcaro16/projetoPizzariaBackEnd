import { Request, Response } from "express";
import { DataUserService } from "../../services/User/DataUserService";

class DetailUserController{
    async handle(req: Request, res: Response){

        const user_id = req.user_id;

        console.log(`ID DO USER: ${user_id}`);

        const detalUserService = new DataUserService();

        const user = await detalUserService.execute(user_id); //Passando o id do user para o método do Service.

        return res.status(201).json({
            User: user
        });

    }
}

export { DetailUserController }