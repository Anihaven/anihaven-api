const { Model, DataTypes } = require('sequelize')

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    class User extends Model {
        getFullname() {
            return [this.firstname, this.lastname].join(' ')
        }
    }

    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INT
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                // We require usernames to have a length of at least 3, and
                // only use letters, numbers and underscores.
                is: /^\w{3,}$/
            }
        },
        // Hashed password
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        // Hash salt
        salt: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                // We require emails to be, well.. emails.
                is: /^\w+@\w+\.\w+$/
            }
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING
    }, { sequelize,
        tableName: 'Users'
    })
}