export const savePlanToState = plan => {
  return {type: 'SAVE_PLAN_TO_STATE', payload: plan}
}

export const savePlansToState = plans => {
  return {type: 'SAVE_PLANS_TO_STATE', payload: plans}
}

export const saveEntryToPlanState = entry => {
  return {type: 'SAVE_ENTRY_TO_PLAN_STATE', payload: entry}
}

export const editPlanInState = plan => {
  return {type: 'EDIT_PLAN_IN_STATE', payload: plan}
}
