import { Request, Response, response } from "express";
import { ListByCategoryService } from "../../services/Products/ListByCategoryService";

class ListByCategoryController{
    async handle(req: Request, res: Response){

        // const { category_id } = req.body;

        const category_id  = req.query.category_id as string; //Força o TS aceitar o parâmetro como string.

        const listByCategoryService = new ListByCategoryService();

        const products = await listByCategoryService.execute({
            category_id
        });

        // console.log(typeof(products));
        // console.log(Object.values(products).length);

        res.json(products);

    }


}

export { ListByCategoryController };
