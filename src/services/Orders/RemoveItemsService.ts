import prismaClient from "../../prisma";

interface ItemRequest{
    item_id: string
}

class RemoveItemsService{
    async execute({ item_id }: ItemRequest){

        const order = await prismaClient.item.delete({
            where:{
                id: item_id
            }
        });

        return {
            success: true,
            message: "Item Deletado Com Sucesso!",
            order: order
        }

    };
}

export {RemoveItemsService};