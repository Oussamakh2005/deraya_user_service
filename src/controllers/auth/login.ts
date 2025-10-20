import { Context } from "hono";
import { userLoginSchema } from "../../validation/userSchemas";
import prisma from "../../db/prismaClient";
import { password } from "bun";
import { sign } from 'hono/jwt'
import { JWT_SECRET } from "../../config/env";
const login = async (c : Context) => {
    const data = await c.req.json();
    try{
        const credentials = userLoginSchema.parse(data);
        const user = await prisma.user.findFirst({
            where : {
                email : credentials.email
            },
            select : {
                id : true,
                password : true,
                role : true,
                institution_id : true,
            }
        });
        if(!user){
            return c.json({
                msg : "User not found", 
            },404);
        }
        if(!await password.verify(credentials.password,user.password,"bcrypt")){
            return c.json({
                msg : "Wrong password",
            },422);
        }
        const payload = {
            id : user.id,
            role : user.role,
            institution_id : user.institution_id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 10),
        }
        const jwt = await sign(payload , JWT_SECRET);
        return c.json({
            data : jwt
        },200);
    }catch{
        return c.json({
            msg : "Invalid data",
        },422);
    }
}

export default login;