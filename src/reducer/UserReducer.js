const initialState = {
  all: [],
  current: {
    id: 0,
    stripeId: '',
    balance: 0,
    token: '',
    entries: [],
    plans: []
  }
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SAVE_USER_TO_STATE':
      return {
        ...state,
        current: {
          ...state.current,
          id: action.payload.user.id,
          stripeId: action.payload.user.stripe_id,
          entries: action.payload.entries,
          plans: action.payload.plans
        }
      };

    case 'SAVE_TOKEN_TO_STATE':
      return {
        ...state,
        current: {
          ...state.current,
          token: action.payload
        }
      };

    case 'SET_USER_TO_STATE':
      return {
        ...state,
        current: {
          id: action.payload.user.id,
          stripeId: action.payload.user.stripe_id,
          entries: action.payload.entries,
          plans: action.payload.plans,
          token: localStorage.getItem('jwt')
        }
      };

    case 'REMOVE_USER_FROM_STATE':
      localStorage.clear()
      return initialState

    case 'SAVE_USERS_TO_STATE':
      return {
        ...state,
        all: action.payload
      }

    case 'SAVE_ENTRY_TO_STATE':
      return {
        ...state,
        current: {
          ...state.current,
          entries: [...state.current.entries, action.payload]
        }
      }

    case 'EDIT_ENTRY_IN_STATE':
      const editedEntries = state.current.entries.map(entry => {
        if(entry.id === action.payload.id) {
          return {
            ...entry,
            ...action.payload
          }
        } else {
          return entry
        }
      })
      return {
        ...state,
        current: {
          ...state.current,
          entries: editedEntries
        }
      }

    case 'REMOVE_ENTRY_FROM_STATE':
      const removedEntries = state.current.entries.filter(entry => entry.id !== action.payload.id)
      return {
        ...state,
        current: {
          ...state.current,
          entries: removedEntries
        }
      }

    case 'SAVE_PLAN_TO_USER_STATE':
      return {
        ...state,
        current: {
          ...state.current,
          plans: [...state.current.plans, action.payload]
        }
      }

    case 'SAVE_STRIPE_BALANCE_TO_STATE':
      return {
        ...state,
        current: {
          ...state.current,
          balance: action.payload
        }
      }

    default:
      return state;
  }
}

export default userReducer
