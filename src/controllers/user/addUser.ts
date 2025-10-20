import { Context } from "hono";
import prisma from "../../db/prismaClient";
import { password } from "bun";
import { HASH_COST } from "../../config/env";
import { userSchema } from "../../validation/userSchemas";
import existedUser from "../../helpers/existedUser";

const addUser = async (c : Context) => {
    const  userData  = await c.req.json();
    try {
        if(await existedUser(userData.email)){
            return c.json({
                msg : "Email already in used"
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
                role: "PATIENT",
            }
        })
        return c.json({
            msg: "Created successfully"
        }, 201)
    }catch{
        return c.json({
            msg : "Invalid data",
        },422);
    }
}

export default addUser;