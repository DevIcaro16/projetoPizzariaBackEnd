import { Request, Response } from "express";
import { CreateProductService } from "../../services/Products/CreateProductService";

//lib do express para upload de arquivos
import { UploadedFile } from "express-fileupload"; 

// Cloudinary

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

//Configurando o método a partir das credenciais da conta cloudinary (.env)

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_KEY,
   api_secret: process.env.CLOUDINARY_SECRET 
});

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        const createProductService = new CreateProductService();

        // Verifica se o arquivo foi enviado
        if (!req.files || !req.files['file']) {
            throw new Error("Imagem Inválida, Erro ao Realizar o Upload!");
        }

        const file = req.files['file'];


        // Verifica se o arquivo é único ou múltiplo
        if (Array.isArray(file)) {
            throw new Error("Apenas um arquivo é permitido para upload.");
        }

        const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, function (error, result) {
                if(error){
                    reject(error);
                    return;
                }
                
                resolve(result);
            }).end(file.data);
        });

        console.log(file); // file é garantido como UploadedFile
        console.log(resultFile);
        

        // return res.json({});


        // Continuar com a criação do produto
        const product = await createProductService.execute({
            name,
            price,
            description,
            banner: resultFile.url,
            category_id,
        });

        return res.json(product);
    }
}

export { CreateProductController };
