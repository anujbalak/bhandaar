import { PrismaClient } from '../generated/prisma/client.js'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

export const addUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        },
    });
}

export const getUser = async ({id, name, email}) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    id: id
                },
                {
                    name: {
                        contains: name,
                    },
                },
                {
                    email: {
                        contains: email,
                    },
                },
            ],
        },
    });
    return user;
}