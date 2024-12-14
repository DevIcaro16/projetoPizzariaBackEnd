import prismaClient from "../../prisma";

interface DetailRequest{
    order_id: string;
}

class DetailsOrderService{
    async execute({ order_id }: DetailRequest){

        const order = await prismaClient.item.findMany({
            where:{
                order_id: order_id
            },

            //Inclue nessa resposta as informações / dados dos Models Product e Order 
            //OBS: Isso é possível por conta do Relacionamento entre as 3 tabelas:
            
            include:{
                Product: true,
                Order: true
            }
        });

        return {
            // success: true,
            // message: "Detalhes do Pedido:",
            // items: items
            order
        };
    };
}

export { DetailsOrderService };