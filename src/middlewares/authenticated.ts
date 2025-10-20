import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { JWT_SECRET } from "../config/env";

const authenticated = async (c: Context, next: Next) => {
    const token = c.req.header("Authorization") as string;
    if (!token) {
        return c.json({
            msg: "Not authorized"
        }, 401);
    }
    const payload = await verify(token, JWT_SECRET);
    if (!payload) {
        return c.json({
            msg: "Not authorized"
        }, 401);
    }
    c.set("jwtPayload",{
        id : payload.id,
        role : payload.role,
        institution_id : payload.institution_id,
    });
    await next();
}

export default authenticated;