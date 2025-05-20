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

export const addFile = async (
    {
        originalname, 
        size, 
        asset_id, 
        public_id, 
        uploaderId,
        url,
        resource_type,
    }) => {
        
    await prisma.file.create({
        data: {
            originalname,
            size,
            uploaderId,
            asset_id,
            public_id,
            url,
            resource_type,
        },
        include: {
            uploader: true,
        }
    })
}

export const getFile = async ({id, originalname, uploaderId}) => {
    const file = await prisma.file.findFirst({
        where: {
            OR: [
                {
                    originalname: {
                        contains: originalname,
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
    return file
};

export const getAllFiles = async ({uploaderId}) => {
    try {
        const files = await prisma.file.findMany({
            where: {
                uploaderId,
                Folder: null,
                home: true
            },
            include: {
                Folder: true
            }
        });
        return files
    } catch (error) {
        console.error(error);
    }
}

export const updateDownloadCount = async (id) => {
    const file = await prisma.file.update({
        where: {
            id
        },
        data: {
            downloadCount: {
                increment: 1
            }
        }
    });
    return file
};

export const deleteFile = async (id) => {
    const file = await prisma.file.delete({
        where: {
            id
        },
    });
    return file
}

// const main = async () => {
//     const files = await prisma.file.deleteMany();
//     console.log(files)
// }

// main()