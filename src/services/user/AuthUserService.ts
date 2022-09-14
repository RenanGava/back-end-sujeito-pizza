import prismaClient from "../../prisma"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface AuthRequest{
    email: string,
    password: string
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        
        // procura o uruario no banco e salva na variavel user
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        // verifica se o usuario existe se não existir retorna um erro
        if(!user) {
            throw new Error("User Not Already Exists!")
        }

        // verificar a senha OBS: descriptografar a senha antes para ser verificada.
        // só consigo pegar a senha do meu usuario do banco pois consultei logo acima
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Password Incorrect")
        }

        // gerar um token JWT e devolver os dados do usuario menos OBS: Menos a senha.
        // se deu tudo certo gerar o token para o usuario.
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET, // chave para descriptografar o jwt
            {
                subject: user.id,
                expiresIn: "30d"
            }
        )

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }