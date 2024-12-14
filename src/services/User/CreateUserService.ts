import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        // Verificar se o email foi enviado
        if (!email) {
            throw new Error("Email Incorreto!");
        }

        // Verificar se o email já está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });

        if (userAlreadyExists) {
            throw new Error("Usuário Já Cadastrado!");
        }

        // Criptografar a senha
        const passwordHash = await hash(password, 8);

        // Criar o usuário no banco de dados
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return user;
    }
}

export { CreateUserService };
