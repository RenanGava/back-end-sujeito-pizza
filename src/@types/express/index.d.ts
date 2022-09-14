// aqui nós vamos sobrescrever a typagem do request do express
// para ele receber a propriedade "user_id", assim teremos todo o funcionamento
// do Request e receberemos o "user_id".
declare namespace Express {
    export interface Request{
        user_id: string
    }
}

// OBS:  lembrando que temos que criar a pasta @types e a pasta deve ter o nome
// do framework que devemos sobrescrever a classe
// lembrar de desmarcar a propriedade "typeRoots" no ts config e colocar o caminho
// onde a pasta está.