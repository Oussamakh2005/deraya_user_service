import { Context } from "hono";
import { newInstitutionSchema } from "../../validation/institutionSchemas";
import prisma from "../../db/prismaClient";
import { userSchema } from "../../validation/userSchemas";
import { password } from "bun";
import { HASH_COST } from "../../config/env";
import existedUser from "../../helpers/existedUser";

const newInstitution = async (c: Context) => {
    const { adminData, institutionData } = await c.req.json();
    try {
        const institution = newInstitutionSchema.parse(institutionData);
        const admin = userSchema.parse(adminData);
        if (await existedUser(adminData.email)) {
            return c.json({
                msg: "Email already in used"
            },403);
        }
        const { id } = await prisma.institution.create({
            data: {
                name: institution.name,
                type: institution.type,
                address: institution.address,
            },

        });
        await prisma.user.create({
            data: {
                email: admin.email,
                phone: admin.phone,
                full_name: admin.full_name,
                password: await password.hash(admin.password, {
                    algorithm: 'bcrypt',
                    cost: HASH_COST,
                }),
                role: "ADMIN",
                institution_id: id,
            }
        })
        return c.json({
            msg: "Created successfully"
        }, 201)

    } catch {
        return c.json({
            msg: "Invalid data"
        }, 422);
    }
}

export default newInstitution;