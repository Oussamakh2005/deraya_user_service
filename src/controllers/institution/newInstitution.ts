import { Context } from "hono";
import type { Institution } from "../../types/institutionTypes";
import { newInstitutionSchema } from "../../validation/institutionSchemas";
import prisma from "../../db/prismaClient";

const newInstitution = async (c: Context) => {
    const data = await c.req.json() as Institution;
    const validated = newInstitutionSchema.parse(data);
    if (!validated) {
        return c.json({
            msg: "Invalid data"
        }, 401);
    }
    await prisma.institution.create({
        data: {
            name: validated.name,
            type: validated.type,
            address: validated.address,
        }
    });
    return c.json({
        msg: "Created successfully"
    }, 201)
}

export default newInstitution;