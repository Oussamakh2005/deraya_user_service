import prisma from "../db/prismaClient"

const existedUser = async (email : string) => {
    const isRegistred = await prisma.user.findFirst({
        where : {
            email : email,
        }
    });
    return isRegistred? true : false; 
}

export default existedUser;