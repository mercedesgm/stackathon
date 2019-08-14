import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import posts from './posts'

const reducer = combineReducers({
    user,
    posts
})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))

const store = createStore(reducer, middleware)

export default store