import { Hono } from "hono";
import institutionRouter from "./institution";

const mainRouter = new Hono();

//institution router :
mainRouter.route('/institution',institutionRouter);



export default mainRouter;