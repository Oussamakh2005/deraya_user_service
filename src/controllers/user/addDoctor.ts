import { Context } from "hono";
import { userSchema } from "../../validation/userSchemas";
import prisma from "../../db/prismaClient";
import { password } from "bun";
import { HASH_COST } from "../../config/env";
import existedUser from "../../helpers/existedUser";

const addDoctor = async (c: Context) => {
    const  userData  = await c.req.json();
    try {
        if (await existedUser(userData.email)) {
            return c.json({
                msg: "Email already in used"
            },403);
        }
        const user = userSchema.parse(userData);
        await prisma.user.create({
            data: {
                email: user.email,
                phone: user.phone,
                full_name: user.full_name,
                password: await password.hash(user.password, {
                    algorithm: 'bcrypt',
                    cost: HASH_COST,
                }),
                role: "DOCTOR",
                institution_id: c.get("jwtPayload").institution_id,
            }
        })
        return c.json({
            msg: "Created successfully"
        }, 201)
    } catch {
        return c.json({
            msg: "Invalid data",
        }, 422);
    }
}

export default addDoctor;