import { Request, Response } from "express";
import { DetailsOrderService } from "../../services/Orders/DetailsOrderService";

class DetailsOrderController{
    async handle(req: Request, res: Response){

        const order_id = req.query.order_id as string;

        const detailsOrderService = new DetailsOrderService();

        const orders = await detailsOrderService.execute({
            order_id
        });

        res.json(orders);

    };
}

export { DetailsOrderController };