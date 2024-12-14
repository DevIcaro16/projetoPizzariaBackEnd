import prismaClient from "../../prisma";

interface ProductRequest{
    category_id: string;
}

class ListByCategoryService{
    async execute({category_id}: ProductRequest){
        const findByCategory = await prismaClient.product.findMany({
            where:{
                category_id: category_id
            }
        });

        //Verifica se não há registros de produtos com base na categoria fornecida: 
        if(Object.values(findByCategory).length === 0){
            throw new Error("Nenhum Produto Encontrado!");
        }

        return ({
            success: true,
            findByCategory
        });
    }
}

export { ListByCategoryService };