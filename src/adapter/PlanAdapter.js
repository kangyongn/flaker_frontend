import { savePlanToState, savePlansToState, editPlanInState} from '../action/PlanAction';
import { savePlanToUserState } from '../action/UserAction';

export const postPlan = info => {
  return (dispatch) => {
    return fetch("https://flaker-backend.herokuapp.com/api/v1/plans", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(plan => {
      dispatch(savePlanToState(plan))
      dispatch(savePlanToUserState(plan))
      return plan
    })
  }
}

export const patchPlan = id => {
  return (dispatch) => {
    return fetch(`https://flaker-backend.herokuapp.com/api/v1/plans/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({end: true})
    })
    .then(res => res.json())
    .then(plan => {
      dispatch(editPlanInState(plan))
    })
  }
}

export const getPlans = () => {
  return (dispatch) => {
    return fetch("https://flaker-backend.herokuapp.com/api/v1/plans")
      .then(res => res.json())
      .then(plans => {
        dispatch(savePlansToState(plans))
      })
  }
}
