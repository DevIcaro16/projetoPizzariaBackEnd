import prismaClient from "../../prisma";

//Importando o método compare do Bcryptjs -> compara uma senha normal com uma senha criptografada no BD.
import { compare } from "bcryptjs";

//Importando o sign do JWT:

import { sign } from "jsonwebtoken";

interface AuthService{
    email: string,
    password: string
}

class AuthUserService{
    async execute( { email, password }: AuthService ){

        const user = await prismaClient.user.findFirst({ 
            where:{
                email: email,

            }
        });

        if(!user){
            throw new Error("Usuário Não Encontrado!");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Senha Inválida!");
        }

        //Gerar o Token de sessão (JWT) e retornar as informações do usuário (id, email, nome...)

        const token = sign({
            name: user.name,
            email: user.email
        }, 
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '30d'
        }
    );

        return {
            success: true,
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };

    }
}

export {AuthUserService};