import { Hono } from "hono";
import addUser from "../controllers/user/addUser";
import addDoctor from "../controllers/user/addDoctor";
import login from "../controllers/auth/login";
import isAdmin from "../middlewares/isAdmin";
import authenticated from "../middlewares/authenticated";

const userRouter = new Hono();

//register user :
userRouter.post('/user',addUser);
//register doctor :
userRouter.post('/doctor',authenticated,isAdmin,addDoctor);
//login :
userRouter.post('/login',login);



export default userRouter;