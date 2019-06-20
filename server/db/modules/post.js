const Sequelize = require('sequelize')
const db = require('../db')

const Post = db.define('post', {
    title: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    dirtyImage: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cleanImage: {
        type: Sequelize.INTEGER,
    },
    latitude: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    longitude: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER
    }
})

module.exports = Post;