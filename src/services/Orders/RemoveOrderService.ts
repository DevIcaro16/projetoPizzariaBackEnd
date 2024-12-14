import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string
}

class RemoveOrderService{
    async execute({ order_id }: OrderRequest){

        const order = await prismaClient.order.delete({
            where: {
                id: order_id
            }
        }); 

        return {
            success: true,
            message: "Comanda deletada com Sucesso!",
            order: order
        };
    };
}

export {RemoveOrderService};