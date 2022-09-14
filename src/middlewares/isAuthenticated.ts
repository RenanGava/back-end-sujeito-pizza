import { NextFunction, Request, Response } from 'express'
import { verify } from "jsonwebtoken"

interface Payload {
    sub: string
}


export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    
    // Receber o token

    const authToken = req.headers.authorization

    if(!authToken) {
        return res.status(401).end()
    }

    // usando a virgula nós ignoramos o primeiro item
    const [, token] = authToken.split(" ")

    try{
        // Validar o token.
        // com o "as" nós afirmamos qual será a resposta do método utilizado
        // o "sub" é a mesma coisa qoe o id do usuario no banco de dados
        // o jsonwebtoken muda para sub quando recebe os dados.
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload

        // recuperar o id do usuario pelo token JWT e passalo para dentro
        // do req "Request"
        req.user_id = sub

        return next()
        
    }catch(err){
        return res.status(401).end()
    }
    
}