import prismaClient from "../../prisma";

interface DetailRequest{
    order_id: string
}

class DetailOrderService{
    async execute({ order_id }:DetailRequest){
        const order = await prismaClient.item.findMany({
            where:{
                order_id: order_id
            },
            include:{ 
                // aqui pegamos os dados das tabelas do realcionament
                // no caso como o item se relaciona com a order e o product
                // seus dados são recuperados do bando de dados também 
                // graças ao relacionamento
                product: true,
                order:true
            }
        })

        return order
    }
}

export { DetailOrderService }