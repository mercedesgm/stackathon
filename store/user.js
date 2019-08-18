import axios from 'axios'

const GOT_USER = 'GOT_USER';
const REMOVE_USER = 'REMOVE_USER';

const ip = //hard coded for development

const defaultUser = {};

const gotUser = (user) => ({type: GOT_USER, user})
const removeUser = () => ({type: REMOVE_USER})

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(gotUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  try {
    let {data} = await axios.post(`http://${ip}/auth/${method}`, {email, password})
    dispatch(gotUser({id: data.id, email}))
  } catch (authError) {
    return dispatch(gotUser({error: authError}))
  }
}

export const logout = () => async dispatch => {
  try {
    dispatch(removeUser())
    await axios.post(`http://${ip}/auth/logout`)
  } catch (err) {
    console.error(err)
  }
}

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
