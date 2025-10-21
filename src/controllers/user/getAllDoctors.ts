import { Context } from "hono";
import prisma from "../../db/prismaClient";
const getAllDoctors = async (c: Context) => {
    const doctors = await prisma.user.findMany({
        where: {
            role: "DOCTOR",
            institution_id: c.get("jwtPayload").institution_id
        },
        select : {
            id : true,
            full_name : true,
            email : true,
            phone : true,
        }
    });
    return c.json({
        data : doctors
    },200);
}

export default getAllDoctors;