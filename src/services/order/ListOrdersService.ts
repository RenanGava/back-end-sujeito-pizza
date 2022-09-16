import prismaClient from "../../prisma";


class ListOrdersService{
    async execute(){
        const orders = await prismaClient.order.findMany({
            where:{
                draft: false,
                status: false
            },
            orderBy:{ // aqui ordenamos como será listado os dados
                created_at: "desc"// no caso será da data mais recente pra mais antiga
            }
        })

        return orders
    }
}

export { ListOrdersService }