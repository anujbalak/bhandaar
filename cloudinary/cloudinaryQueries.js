import pkg from 'cloudinary'

const cloudinary = pkg.v2;

export const deleteFromCloud = async (public_id, resource_type) => {
    await cloudinary.uploader.destroy(public_id, {
        resource_type
    }).then((result) => console.log(result))
    .catch((err) => console.log(err));
}

export const buildDataURL = (file) => {
    try {
        const b64 = Buffer.from(file.buffer).toString('base64')
        let dataURL = 'data:' + file.mimetype + ';base64,' + b64;
        return dataURL
    } catch (error) {
        console.log(error)
    }
}

export const handleHomeUpload = async (file) => {
    const res = await cloudinary.uploader.upload(file, {resource_type: 'auto'});
    return res;
}

export const handleFolderUpload = async (file, folder) => {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
        folder: folder.id,
        use_asset_folder_as_public_id_prefix: true,
    });
    return res;
}

export const deleteFromCloudFolder = async (folderId) => {
    await cloudinary.api.delete_resources_by_prefix(folderId).then((result) => console.log(result))
    .catch((err) => console.log(err));
}

export const downloadFromCloud = async () => {
    
}