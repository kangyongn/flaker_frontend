import {saveEntryToState, editEntryInState, removeEntryFromState} from '../action/UserAction';
import {saveEntryToPlanState} from '../action/PlanAction';

export const postEntry = (info, plan) => {
  return (dispatch) => {
    return fetch("https://flaker-backend.herokuapp.com/api/v1/entries", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({wager: info.cost, attending: info.attending, user_id: info.creator_id, plan_id: plan.id})
    })
    .then(res => res.json())
    .then(entry => {
      dispatch(saveEntryToState(entry))
    })
  }
}

export const postInvite = (user, plan) => {
  return (dispatch) => {
    return fetch("https://flaker-backend.herokuapp.com/api/v1/entries", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({wager: plan.cost, user_id: user.id, plan_id: plan.id})
    })
    .then(res => res.json())
    .then(entry => {
      dispatch(saveEntryToPlanState(entry))
    })
  }
}

export const patchEntry = id => {
  return (dispatch) => {
    return fetch(`https://flaker-backend.herokuapp.com/api/v1/entries/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({attending: true})
    })
    .then(res => res.json())
    .then(entry => {
      dispatch(editEntryInState(entry))
    })
  }
}

export const patchPayout = (id, amount) => {
  return (dispatch) => {
    return fetch(`https://flaker-backend.herokuapp.com/api/v1/entries/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({payout: amount})
    })
    .then(res => res.json())
    .then(entry => {
      dispatch(editEntryInState(entry))
    })
  }
}

export const deleteEntry = id => {
  return (dispatch) => {
    return fetch(`https://flaker-backend.herokuapp.com/api/v1/entries/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(entry => {
      dispatch(removeEntryFromState(entry))
    })
  }
}
