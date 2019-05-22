const initialState = {
  all: []
}

const planReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SAVE_PLAN_TO_STATE':
      return {
        all: [...state.all, action.payload]
      }

    case 'SAVE_PLANS_TO_STATE':
      return {
        all: action.payload
      }

    case 'SAVE_ENTRY_TO_PLAN_STATE':
      const currentPlan = state.all.find(plan => plan.id === action.payload.plan_id)
      const newEntries = [...currentPlan.entries, action.payload]
      const savedEntry = state.all.map(plan => {
        if(plan.id === action.payload.plan_id) {
          return {
            ...plan,
            entries: newEntries
          }
        } else {
          return plan
        }
      })
      return {
        all: savedEntry
      }

    case 'EDIT_PLAN_IN_STATE':
      const editedPlans = state.all.map(plan => {
        if(plan.id === action.payload.id) {
          return action.payload
        } else {
          return plan
        }
      })
      return {
        all: editedPlans
      }

    default:
      return state;
  }
}

export default planReducer
