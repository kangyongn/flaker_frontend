import React from 'react';
import {connect} from 'react-redux';

import {Menu} from 'semantic-ui-react';

const EndMenu = props => {
  const plans = props.plan.filter(plan => plan.creator_id === props.user.id && plan.end === true)

  const menuItem = plans.map(plan => {
    return (
      <Menu.Item
        key={plan.id}
        value={plan.id}
        active={props.active === plan.id}
        onClick={props.handleClick}
      >
        {plan.name}
      </Menu.Item>
    )
  })

  return (
    <React.Fragment>
      {menuItem}
    </React.Fragment>
  )

}

const mapStateToProps = state => {
  return {
    user: state.user.current,
    plan: state.plan.all
  }
}

export default connect(mapStateToProps)(EndMenu)
