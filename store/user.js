import axios from 'axios'

const GOT_USER = 'GOT_USER';
const REMOVE_USER = 'REMOVE_USER';

const defaultUser = {};

const gotUser = (user) => ({type: GOT_USER, user})
const removeUser = () => ({type: REMOVE_USER})

// THUNKS
// GET ME
// LOGIN
// LOGOUT
// CHANGE NAME


export default function(state = defaultUser, action) {
    switch (action.type) {
      case GOT_USER:
        return action.user
      case REMOVE_USER:
        return defaultUser
      default:
        return state
    }
}