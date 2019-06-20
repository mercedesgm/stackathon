const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    googleId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = User;