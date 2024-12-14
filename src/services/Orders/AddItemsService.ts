import prismaClient from "../../prisma";

interface ItemRequest{
    order_id: string,
    product_id: string,
    amount: number
}

class AddItemsService{
    async execute({
        order_id,
        product_id,
        amount
    }: ItemRequest){
        const order = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                amount
            }
        });

        return {
            success: true,
            message: "Pedido Realizado Com Sucesso!",
            item: order
        };
    };
}

export {AddItemsService};