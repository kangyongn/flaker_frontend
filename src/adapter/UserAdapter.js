import { saveUsersToState } from '../action/UserAction';
import { saveUserToState } from '../action/UserAction';
import { saveTokenToState } from '../action/UserAction';
import { setUserToState } from '../action/UserAction';

export const getCurrentUser = () => {
  return (dispatch) => {
    return fetch('https://flaker-backend.herokuapp.com/api/v1/current_user', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(user => {
      dispatch(setUserToState(user))
    })
  }
}

export const postLogIn = (user) => {
  return (dispatch) => {
    return fetch("https://flaker-backend.herokuapp.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(info => {
      if (info.jwt) {
        dispatch(saveUserToState(info))
        dispatch(saveTokenToState(info.jwt))
        localStorage.setItem("jwt", info.jwt)
      }
    })
  }
}

export const postSignUp = (user) => {
  return (dispatch) => {
    return fetch("hhttps://flaker-backend.herokuapp.com/api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(info => {
      if (info.jwt) {
        dispatch(saveUserToState(info))
        dispatch(saveTokenToState(info.jwt))
        localStorage.setItem('jwt', info.jwt)
      }
    })
  }
}

export const getUsers = () => {
  return (dispatch) => {
    return fetch('https://flaker-backend.herokuapp.com/api/v1/users')
      .then(res => res.json())
      .then(users => {
        dispatch(saveUsersToState(users))
      })
  }
}
