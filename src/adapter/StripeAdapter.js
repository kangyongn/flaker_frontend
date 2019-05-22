import {saveStripeBalanceToState} from '../action/UserAction';

export const getStripe = stripeId => {
  return (dispatch) => {
    return fetch('https://api.stripe.com/v1/balance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Account': stripeId,
        'Authorization': `Bearer (secret key)` 
      }
    })
      .then(res => res.json())
      .then(balance => {
        if(balance.available) {
          dispatch(saveStripeBalanceToState(balance.available[0].amount))
        } else {
          dispatch(saveStripeBalanceToState(0))
        }
      })
  }
}
