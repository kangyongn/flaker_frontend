import React from 'react';
import {Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

import {connect} from 'react-redux';

import {removeUserFromState} from '../action/UserAction';

const NavBar = props => {
  const defaultNav = () => {
    return (
      <Menu pointing secondary>
        <Menu.Item header><strike>Flaker</strike></Menu.Item>
        <Menu.Item header as={NavLink} to='/signup' children='Sign Up' />
        <Menu.Item header as={NavLink} to='/login' position='right' children='Login' />
      </Menu>
    )
  }

  const userNav = () => {
    return (
      <Menu pointing secondary>
        <Menu.Item header><strike>{props.currentUser ? props.currentUser.name : 'Flaker'}</strike></Menu.Item>
        <Menu.Item header as={NavLink} to='/creator-dashboard' children='Creator Dashboard' />
        <Menu.Item header as={NavLink} to='/dashboard' children='Dashboard' />
        <Menu.Item header as={NavLink} to='/end-dashboard' children='End Dashboard' />
        <Menu.Item header as={NavLink} to='/create-plan' children='Create Plan' />
        <Menu.Item header as={NavLink} to='/login' position='right' onClick={props.removeUserFromState}>Logout</Menu.Item>
      </Menu>
    )
  }

  return (
    props.user.current.token ? userNav() : defaultNav()
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentUser: state.user.all.find(user => user.id === state.user.current.id)
  }
}

export default connect(mapStateToProps, {removeUserFromState})(NavBar)
