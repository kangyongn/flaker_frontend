import React, {Component} from 'react';
import {connect} from 'react-redux';

import DashboardMenu from '../component/dashboard/DashboardMenu';
import DashboardSegment from '../component/dashboard/DashboardSegment';

import {StripeProvider, Elements} from 'react-stripe-elements';

class Dashboard extends Component {
  state = {
    active: ''
  }

  handleClick = (e, {value}) => {
    this.setState({
      active: value
    })
  }

  render() {
    const entry = this.props.user.entries.find(entry => entry.plan_id === this.state.active)
    const plan = this.props.plan.find(plan => plan.id === this.state.active)

    return (
      <div className='flaker-dashboard'>
        <h1 style={{'textAlign': 'center'}}>Dashboard</h1>
        <StripeProvider apiKey='pk_test_FSRfhLIrttg50RdN9s1xt4Xr00mUF63Xd8'>
          <Elements>
            <DashboardSegment entry={entry} plan={plan}/>
          </Elements>
        </StripeProvider>
        <DashboardMenu active={this.state.active} handleClick={this.handleClick}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.current,
    plan: state.plan.all
  }
}

export default connect(mapStateToProps)(Dashboard)
