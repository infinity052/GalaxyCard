class Admin{

    async constructor(){
        this.model = require('../models/User');
        await this.model.sync();
    }

    async createUser(username, firstname, lastname){
        if(userExists(username))
        return false;
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
    
    async deleteUser(username){
        await this.model.destroy({
            where: {
                username
            }
        });
    }
    
    async userExists(username){
        const res = await readUser(username);
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
    
}

