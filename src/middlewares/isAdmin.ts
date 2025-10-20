import { Context, Next } from "hono";

const isAdmin = async (c: Context, next: Next) => {
    const payload = c.get("jwtPayload");
    if (payload.role !== "ADMIN") {
        return c.json({
            msg: "Not authorized"
        }, 401);
    }
    await next();
}

export default isAdmin;