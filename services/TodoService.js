class TodoService {
    constructor(db) {
        this.client = db.sequelize;
        this.todo = db.Todo;
    }

    async create(name, deadline, points) {
        return this.todo.create(
            {
                Name: name,
                Deadline: deadline,
                Points: points
            }
        ).catch(function (err) {
            console.log(err);
        });
    }

    async getAll() {
        return this.todo.findAll({
            where: {}
        }).catch(function (err) {
            console.log(err);
        });
    }

    async getOne(todoId) {
        return this.todo.findOne({
            where: {id: todoId}
        }).catch(function (err) {
            console.log(err);
        });
    }

    async delete(todoId) {
        return this.todo.destroy({
            where: {id: todoId}
        }).catch(function (err) {
            console.log(err);
        });
    }
}
module.exports = TodoService;