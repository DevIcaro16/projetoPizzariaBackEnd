import { Request, Response, response } from "express";
import { ListCategoryService } from "../../services/Category/ListCategoryService";
import prismaClient from "../../prisma";


class ListCategoryController{
    async handle(req: Request, res: Response){

        const listCategoryService = new ListCategoryService();

        const allCategories = await listCategoryService.execute();

        res.json(allCategories);

    }
}

export { ListCategoryController };