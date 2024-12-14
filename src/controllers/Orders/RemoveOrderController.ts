import { Request, Response, response } from "express";
import { RemoveOrderService } from "../../services/Orders/RemoveOrderService";

class RemoveOrderController{
    async handle(req: Request, res:Response){

        //Define para o Typescript que este parâmetro é uma string (deve receber uma string).
        const order_id = req.query.order_id as string;

        const removeOrder = new RemoveOrderService();

        const order = await removeOrder.execute({
            order_id
        });

        res.json(order);
    };
}

export {RemoveOrderController};