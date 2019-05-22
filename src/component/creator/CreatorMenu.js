import React from 'react';
import {connect} from 'react-redux';

import {Menu, Icon} from 'semantic-ui-react';

const CreatorMenu = props => {
  const plans = props.plan.filter(plan => plan.creator_id === props.user.id && plan.end === false)

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
      {props.active ?
        <React.Fragment>
          <Menu.Item onClick={props.handleAddClick}><Icon name='add'/>Add User {props.active ? `To ${props.active.name}` : null}</Menu.Item>
          <Menu.Item onClick={props.handleFinishClick}><Icon name='close'/>Finished {props.active ? props.active.name : null}</Menu.Item>
        </React.Fragment>
        :
        null
      }
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

export default connect(mapStateToProps)(CreatorMenu)
