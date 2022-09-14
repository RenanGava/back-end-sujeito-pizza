import prismaClient from "../../prisma";
import { hash } from "bcryptjs"

interface UserRequest{
    name: string;
    email: string;
    password: string
}

class CreateUserService {
    async execute({name, email, password}: UserRequest) {

        // verificar se foi enciado um email
        if(!email){
            throw new Error("Email incorrect!")
        }

        // verificar se já existe um email no banco
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists) {
            throw new Error("User Already Exists!")
        }

        // aqui criptografamos a senha para ser cadastrada no banco de dados
        const passwordHash = await hash(password, 8)
        

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            // o select vai devolver apenas os campos que forem
            // dados como true para não mostrarmos por exemplo uma senha de usuario.
            select:{
                id: true,
                email: true,
                name: true
            }
        })


        return user
    }
}

export { CreateUserService }