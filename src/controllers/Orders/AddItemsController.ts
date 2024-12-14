import { Request, Response, response } from "express";
import { AddItemsService } from "../../services/Orders/AddItemsService";


class AddItemsController{
    async handle(req: Request, res: Response){

        const { order_id, product_id, amount } = req.body;

        const addItem = new AddItemsService();

        const order = await addItem.execute({
            order_id,
            product_id,
            amount,
        });

        res.json(order);
    };
}

export {AddItemsController};