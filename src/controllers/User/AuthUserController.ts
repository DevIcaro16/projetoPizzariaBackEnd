import { Request, Response, response } from "express"
import { AuthUserService } from "../../services/User/AuthUserService"


class AuthUserController{
    async handle(req: Request, res: Response){
        const { email, password } = req.body;

        const authService = new AuthUserService();

        const auth = await authService.execute({
            email,
            password
        });
 
        return res.json(auth);

    }
} 

export { AuthUserController }