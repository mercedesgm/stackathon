import axios from 'axios'

const GOT_MY_POSTS = 'GOT_MY_POSTS';
const GOT_ALL_POSTS = 'GOT_ALL_POSTS';

const defaultPosts = {
    myPosts: [],
    allPosts: []
}

const gotMyPosts = (posts) => ({type: GOT_MY_POSTS, posts})
const gotAllPosts = (posts) => ({type: GOT_ALL_POSTS, posts})

// THUNKS
// get all posts
// get posts by me
// add post
// mark as clean
// delete post

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