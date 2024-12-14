import { Request, Response, response } from "express";
import { RemoveItemsService } from "../../services/Orders/RemoveItemsService";

class RemoveItemsController{
    async handle(req: Request, res: Response){

        const item_id = req.query.item_id as string;

        const removeItemsService = new RemoveItemsService();

        const order = await removeItemsService.execute({
            item_id
        });

        res.json(order);

    }
}

export {RemoveItemsController};