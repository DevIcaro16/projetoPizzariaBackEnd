import multer from "multer";
import crypto from "crypto";


// Biblioteca / Métodos nativos do NODE -> lidar com arquivos: 
import { extname, resolve } from "path";

export default{

    //Método que irá salvar a img:
    upload(folder: string){
        return {
            storage:multer.diskStorage({

                //Pasta de destino (TMP):
                destination: resolve(__dirname, '..', '..', folder),

                filename: (request, file, callback) => {
                    //Criptografia do arquivo:
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    //Nome gerado para o arquivo:
                    const fileName = `${fileHash}-${file.originalname}`;
                    
                    //Retorno (garatindo que nunca se repitirá):
                    return callback(null, fileName);
                }
            })
        };
    }
}