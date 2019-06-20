const Sequelize = require('sequelize')
const db = require('../db')

const Comment = db.define('comment', {
    content: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Comment;