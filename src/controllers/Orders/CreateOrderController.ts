import { Request, Response,response } from "express";
import { CreateOrderService } from "../../services/Orders/CreateOrderService";

class CreateOrderController{
    async handle(req: Request, res: Response){

        const { table, name } = req.body;

        const createOrderService = new CreateOrderService();

        const order = await createOrderService.execute({
            table,
            name
        });

        res.json(order);
    }
}

export {CreateOrderController};