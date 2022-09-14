import express, { Request, Response, NextFunction } from "express";
import cors from "cors"
import "express-async-errors"
import { router } from "./routes";
import path from 'path'

const app = express();
// temos que colocar para falar qual formato de dados iremos usar no caso json
app.use(express.json())
app.use(cors())
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp"))
)
// Rotas Da aplicação
app.use(router)

// recebe os erros da aplicação
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

app.listen(3333, () => {
    console.log("Servidor Online!!");
})