import axios from 'axios'

const GOT_MY_POSTS = 'GOT_MY_POSTS';
const GOT_ALL_POSTS = 'GOT_ALL_POSTS';

const defaultPosts = {
    myPosts: [],
    allPosts: []
}

const gotMyPosts = (posts) => ({type: GOT_MY_POSTS, posts})
const gotAllPosts = (posts) => ({type: GOT_ALL_POSTS, posts})

export const getAllPosts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('http://localhost:8080/api/posts')
      dispatch(gotAllPosts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getMyPosts = (id) => {
  return async dispatch => {
    try {
      const {data} =  await axios.get(`http://localhost:8080/api/posts/${id}`)
      dispatch(gotMyPosts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addPost = (post, id) => {
  return async dispatch => {
    try {
      await axios.post(`http://localhost:8080/api/posts`, post)
      dispatch(getAllPosts())
      dispatch(getMyPosts(id))
    } catch (error) {
      console.log(error)
    }
  }
}

export const markClean = (cleanImage, postId, userId) => {
  return async dispatch => {
    try {
      await axios.put(`http://localhost:8080/api/posts/clean/${postId}`, cleanImage)
      dispatch(getAllPosts())
      if (userId) {
        dispatch(getMyPosts(userId))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const deletePost = (id, userId) => {
  return async dispatch => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${id}`)
      dispatch(getAllPosts())
      dispatch(getMyPosts(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = defaultPosts, action) {
    switch (action.type) {
      case GOT_MY_POSTS:
        return {...state, myPosts: action.posts}
      case GOT_ALL_POSTS:
        return {...state, allPosts: action.posts}
      default:
        return state
    }
}