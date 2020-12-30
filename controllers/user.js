const file = require('../models/File');

function uploadFile(file){
    const result = await file.create({file});
    console.log(result.toJSON());
}

function deleteFile(id){
    await file.destroy({
        where: {
            id
        }
    });
}

module.exports = {uploadFile, deleteFile};