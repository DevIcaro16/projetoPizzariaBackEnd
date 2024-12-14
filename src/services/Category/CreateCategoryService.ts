import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string;
}

// export default class  / também posso fazer a exportação dessa forma
 class CreateCategoryService{
    async execute({ name } : CategoryRequest){

        if(name === ""){
            throw new Error("Nome Inválido!");
        }

        const categoryAlreadyExits = await prismaClient.category.findFirst({
            where:{
                name: name
            }
        });

        if(categoryAlreadyExits){
            throw new Error("Categoria já existente!");
        }

        const category = await prismaClient.category.create({
            data:{
                name: name
            }, 
            select:{
                id: true,
                name: true
            }
        });
        return{
            success: true,
            category: category
        };
    }
}

export {CreateCategoryService};