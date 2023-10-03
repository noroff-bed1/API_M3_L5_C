module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define('Todo', {
        Name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        Deadline: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false
        },
        Points: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false
    });
    return Todo
}
