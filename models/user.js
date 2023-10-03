module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        Email: Sequelize.DataTypes.STRING,
        Password: Sequelize.DataTypes.STRING
    },{
        timestamps: false
    });
    return User
}
