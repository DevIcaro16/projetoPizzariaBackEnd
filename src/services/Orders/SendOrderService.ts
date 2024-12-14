import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
}

class SendOrderService{

    async execute({ order_id }: OrderRequest){

        const order = await prismaClient.order.update({
            where:{
                id: order_id
            },
            data:{
                draft: false
            }
        });

        console.log(order);

        return {
            success: true,
            message: "Pedido Concluído com Sucesso! Saiu do Rascunho!",
            order: order
        };

    }
}

export {SendOrderService};