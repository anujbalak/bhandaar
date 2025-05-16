import { PrismaClient } from '../generated/prisma/client.js'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

export const createFolder = async (name, uploaderId) => {
    await prisma.folder.create({
        data: {
            name,
            uploaderId
        }
    })
}

export const createFolderInFolder = async (id, name, uploaderId) => {
    await prisma.folder.update({
        where: {
            id,
        },
        data: {
            folders: {
                create: {
                    name,
                    uploaderId,
                },
            },
        },
        include: {
            folders: true,
        },
    });
};

export const getAllFolders = async (uploaderId) => {
    const folders = await prisma.folder.findMany({
        where: {
            uploaderId,
            parentFolderId: null,
        }
    })
    console.log(folders)
    return folders
}

export const getFolder = async (id) => {
    try {
        const folder = await prisma.folder.findFirst({
            where: {
                id,
            },
            include: {
                files: true,
                folders: true,
            },
        });
        return folder;
    } catch (error) {
        console.error(error);
    }
}

export const removeFolder = async (id) => {
    await prisma.folder.delete({
        where: {
            id
        },
        include: {
            folders: true,
            files: true,
        },
    });
};

