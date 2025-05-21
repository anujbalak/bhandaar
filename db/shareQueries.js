import { PrismaClient } from '../generated/prisma/client.js'

const prisma = new PrismaClient();

export const addSharedLink = async (folderId, time) => {
    const res = await prisma.share.create({
        data: {
            folderId,
            expiresAt: time,
        },
        include: {
            folder: true,
        },
    });
    return res;
}

export const getSharedLink = async ({id, folderId}) => {
    const res = await prisma.share.findFirst({
        where: {
            OR: [
                {
                    id: {
                        equals: id,
                    },
                },
                {
                    folderId: {
                        equals: folderId
                    }
                },
            ],
        },
    });
    return res;
};

export const deleteSharedLink = async (id) => {
    await prisma.share.delete({
        where: {
            id,
        }
    })
}

export const deleteAllLinks = async () => {
    const result = prisma.share.deleteMany();
    console.log(result);

    return result
}


export const updateSharedLink = async (id, date) => {
    await prisma.share.update({
        where: {
            id
        },
        data: {
            expiresAt: date
        }
    })
}