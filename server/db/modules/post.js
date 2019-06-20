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
        type: Sequelize.BLOB,
        allowNull: false
    },
    cleanImage: {
        type: Sequelize.BLOB,
    },
    latitude: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    longitude: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Post;