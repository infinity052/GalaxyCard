const fs = require('fs');
const path = require('path');
class User{
    
    constructor() {
        this.model = require('../models/File');
    }
    async getFileNames(){
        await this.model.sync();
        const result = await this.model.findAll();
        return result;
    }
    
    async addFile(filename, originalname){
        const result = await this.model.create({filename,originalname});
        console.log(result.toJSON());
    }
    
    async deleteFile(id){
        var filename = await this.model.findAll({where:{id}});
        filename = filename[0].dataValues.filename;
        fs.unlinkSync(path.join(__dirname, '..','uploads',filename));
        await this.model.destroy({
            where: {
                id
            }
        });
    }
    
}
module.exports = new User();