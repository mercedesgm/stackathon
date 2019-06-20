const Post = require('./post')
const Comment = require('./comment')
const User = require('./user')

Comment.belongsTo(Post)
Comment.belongsTo(User)
Post.belongsTo(User)

module.exports = {
    Post,
    Comment,
    User
}