export const saveUserToState = user => {
  return {type: "SAVE_USER_TO_STATE", payload: user}
}

export const saveTokenToState = token => {
  return {type: "SAVE_TOKEN_TO_STATE", payload: token}
}

export const setUserToState = user => {
  return {type:'SET_USER_TO_STATE', payload: user}
}

export const removeUserFromState = () => {
  return {type: 'REMOVE_USER_FROM_STATE'}
}

export const saveUsersToState = users => {
  return {type: 'SAVE_USERS_TO_STATE', payload: users}
}

export const saveEntryToState = entry => {
  return {type: 'SAVE_ENTRY_TO_STATE', payload: entry}
}

export const editEntryInState = entry => {
  return {type: 'EDIT_ENTRY_IN_STATE', payload: entry}
}

export const removeEntryFromState = entry => {
  return {type: 'REMOVE_ENTRY_FROM_STATE', payload: entry}
}

export const savePlanToUserState = plan => {
  return {type: 'SAVE_PLAN_TO_USER_STATE', payload: plan}
}

export const saveStripeBalanceToState = balance => {
  return {type: 'SAVE_STRIPE_BALANCE_TO_STATE', payload: balance}
}
