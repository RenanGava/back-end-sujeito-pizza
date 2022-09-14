import crypto from 'crypto';
import multer from "multer";

import { extname, resolve } from "path";

export default {
    upload(folder: string){
        return {
            storage: multer.diskStorage({
                // o __dirname se refere ao diretorio em que estamos
                // cada ".." daquele volta uma pasta e o folder vamos receber pelo
                // para metro definido no método.
                destination: resolve(__dirname, "..", "..", folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex")
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null, fileName)
                }
            })
        }
    }
}