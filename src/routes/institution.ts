import { Hono } from "hono";
import newInstitution from "../controllers/institution/newInstitution";

const institutionRouter = new Hono();

//new institution :
institutionRouter.post('/',newInstitution);


export default institutionRouter;