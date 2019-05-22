import React from 'react';
import {Switch, Route} from 'react-router-dom';

import LogIn from './LogIn';
import SignUp from './SignUp';
import NewPlan from './NewPlan';
import Dashboard from '../container/Dashboard';
import CreatorDashboard from '../container/CreatorDashboard';
import EndDashboard from '../container/EndDashboard';

import {StripeProvider, Elements} from 'react-stripe-elements';

const Router = () => {
  return (
    <Switch>
      <Route path='/login' component={LogIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/creator-dashboard' component={CreatorDashboard} />
      <Route path='/end-dashboard' component={EndDashboard} />
      <Route path='/dashboard' component={Dashboard} />
      <StripeProvider apiKey='pk_test_FSRfhLIrttg50RdN9s1xt4Xr00mUF63Xd8'>
        <Elements>
          <Route path='/create-plan' component={NewPlan} />
        </Elements>
      </StripeProvider>
    </Switch>
  )
}

export default Router
