const { Op } = require("sequelize");

class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }

    async create(email, password) {
        return this.User.create(
            {
                Email: email,
                Password: password
            }
        ).catch(function (err) {
            console.log(err);
        });
    }

    async getOneByEmail(email) {        
        return await this.User.findOne({
            where: {Email: email}
        }).catch(function (err) {
            console.log(err);
        });
    }

}
module.exports = UserService;