import { Hono } from "hono";
import institutionRouter from "./institution";
import userRouter from "./user";

const mainRouter = new Hono();

//institution router :
mainRouter.route('/institution',institutionRouter);
//user router :
mainRouter.route('/user',userRouter);


export default mainRouter;