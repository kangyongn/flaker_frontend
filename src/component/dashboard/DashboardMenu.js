import React from 'react';
import {connect} from 'react-redux';

import {NavLink} from 'react-router-dom';

import {Icon, Menu} from 'semantic-ui-react';

const DashboardMenu = props => {
  const ids = props.user.entries.map(entry => entry.plan_id)
  const plans = props.plan.filter(plan => ids.includes(plan.id) && !plan.end)

  const menuItem = plans.map(plan => {
    const current = props.user.entries.find(entry => entry.plan_id === plan.id)
    return (
      <Menu.Item
        key={plan.id}
        value={plan.id}
        active={props.active === plan.id}
        onClick={props.handleClick}
      >
        {current ? current.attending ? null : <Icon name='exclamation' color='red'/> : null}
        {plan.name}
      </Menu.Item>
    )
  })

  return (
    <Menu attached='bottom' tabular>
      {menuItem}
      <Menu.Menu postion='right'>
        <Menu.Item as={NavLink} to='create-plan'><Icon name='add'/>Create Plan</Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.current,
    plan: state.plan.all
  }
}

export default connect(mapStateToProps)(DashboardMenu)
