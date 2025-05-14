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

export const addFile = async (originalname, filename, size, user) => {
    await prisma.file.create({
        data: {
            originalname,
            filename,
            size,
            uploaderId: user.id,
        },
        include: {
            uploader: true,
        }
    })
}

export const getFile = async ({id, originalname, filename, uploaderId}) => {
    const file = await prisma.file.findFirst({
        where: {
            OR: [
                {
                    originalname: {
                        contains: originalname,
                    },
                },
                {
                    filename: {
                        contains: filename,
                    },
                },
                {
                    uploaderId
                },
                {
                    id
                },
            ],
        },
    });
    console.log(file)
    return file
};

export const getAllFiles = async ({uploaderId}) => {
    try {
        const files = await prisma.file.findMany({
            where: {
                uploaderId,
            },
        });
        return files
    } catch (error) {
        console.error(error);
    }
}