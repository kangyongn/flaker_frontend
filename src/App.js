import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import Router from './component/Router';

import {getCurrentUser, getUsers} from './adapter/UserAdapter';
import {getPlans} from './adapter/PlanAdapter';
import {getStripe} from './adapter/StripeAdapter';

import NavBar from './component/NavBar';
import LogIn from './component/LogIn';
import SignUp from './component/SignUp';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.user.token ?
          <Router />
          :
          <Switch>
            <Route path='/login' component={LogIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.getPlans()
    this.props.getUsers()
    if(localStorage.getItem('jwt')) {
      this.props.getCurrentUser()
        .then(() => this.props.getStripe(this.props.user.stripeId))
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.current
  }
}

export default connect(mapStateToProps, {getCurrentUser, getUsers, getPlans, getStripe})(App);
