import axios from 'axios'

const ip = '192.168.1.106:8080'

const GOT_MY_POSTS = 'GOT_MY_POSTS';
const GOT_ALL_POSTS = 'GOT_ALL_POSTS';
const GOT_CURRENT_POST = 'GOT_CURRENT_POST';


const defaultPosts = {
    myPosts: [],
    allPosts: [{id: 1, title: "Sunset Park", dirtyImage: "https://detrash.s3.amazonaws.com/Central_park_looking_dirty_dirty.jpg", latitude: 406687360, longitude: -739718420}],
    currentPost: {}
}

const gotMyPosts = (posts) => ({type: GOT_MY_POSTS, posts})
const gotAllPosts = (posts) => ({type: GOT_ALL_POSTS, posts})
const gotCurrentPost = (post) => ({type: GOT_CURRENT_POST, post})

export const getAllPosts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`http://${ip}/api/posts`)
      dispatch(gotAllPosts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getMyPosts = (id) => {
  return async dispatch => {
    try {
      const {data} =  await axios.get(`http://${ip}/api/posts/my/${id}`)
      dispatch(gotMyPosts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getPost = (id) => {
  return async dispatch => {
    try {
      if (id) {
        const {data} =  await axios.get(`http://${ip}/api/posts/${id}`)
        dispatch(gotCurrentPost(data))
      } else dispatch(gotCurrentPost({}))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addPost = (post, id) => {
  return async dispatch => {
    try {
      await axios.post(`http://${ip}/api/posts`, post)
      dispatch(getAllPosts())
      // dispatch(getMyPosts(id))
    } catch (error) {
      console.log(error)
    }
  }
}

export const markClean = (cleanImage, postId, userId) => {
  return async dispatch => {
    try {
      await axios.put(`http://${ip}/api/posts/clean/${postId}`, {cleanImage})
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
      await axios.delete(`http://${ip}/api/posts/${id}`)
      dispatch(getAllPosts())
      dispatch(getMyPosts(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addComment = (content, userId, postId) => {
  return async dispatch => {
    try {
      await axios.post(`http://${ip}/api/posts/comment`, {content, userId, postId})
      dispatch(getPost(postId))
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
      case GOT_CURRENT_POST:
        return {...state, currentPost: action.post}
      default:
        return state
    }
}