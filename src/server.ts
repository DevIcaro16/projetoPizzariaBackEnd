import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

//Por algum motivo, a ordem da importação do arquivo de rotas bagunçou o throw new Err().     
//OBS: Deixar ele abaixo do import acima (empress-async-erros).
import { router } from "./routes";
import fileUpload from "express-fileupload";

import cors from "cors";


import dotenv from "dotenv";
import path from "path";
dotenv.config();
   
const app = express(); 

app.use(express.json());

app.use(cors());

app.use(fileUpload({
  limits: {
    fileSize: 50 * 1024 * 1024
  }
}));

app.use(router); 


app.get("/", (req: Request, res: Response): Response => {
  return res.json({
      owner: "ÍCARUS" 
  }); 

  // throw new Error("Erro na Requisição!");
});

// Rota estática para ter acesso aos arquivos salvos no servidor (Middleware):

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
      //Se for uma instancia do tipo error
      return res.status(400).json({
        error: err.message
      })
    }
  
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error.'
    })
  
  })




const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(3200, () =>{
    console.log(`Servidor da Aplicação Rodando na Porta: ${port}`);
});
 