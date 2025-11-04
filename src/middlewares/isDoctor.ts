import { Context, Next } from "hono";

const isDoctor = async (c: Context, next: Next) => {
    const payload = c.get("jwtPayload");
    if (payload.role !== "DOCTOR") {
        return c.json({
            msg: "Not authorized"
        }, 401);
    }
    await next();
}

export default isDoctor;