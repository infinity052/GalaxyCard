class Admin{

    constructor(){
        this.model = require('../models/User');
    }

    async createUser(username, firstname, lastname){
        const result = await this.model.create({username, firstname, lastname});
        console.log(result.toJSON());
        return true;
    }
    
    async updateFirstName(username, firstname){
        await this.model.update({ firstname }, {
            where: {
                username
            }
        });
    }
    
    async updateLastName(username, lastname){
        await this.model.update({ lastname }, {
            where: {
                username
            }
        });
    }
    
    async deleteUser(id){
        await this.model.destroy({
            where: {
                id
            }
        });
    }
    
    async userExists(username){
        const res = await this.readUser(username);
        if(res.length == 0)
        return false;
        
        return true;
    }
    
    async readUser(username){
        const result = await this.model.findAll({
            where: {username}
        });
        return result;
    }

    async getAllUsers(){
        const result = await this.model.findAll();
        return result;
    }
}

module.exports = new Admin();