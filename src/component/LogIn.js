import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {postLogIn, getUsers} from '../adapter/UserAdapter';
import {getPlans} from '../adapter/PlanAdapter';

import {Input, Button} from 'semantic-ui-react';

class LogIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.postLogIn(this.state)
    this.props.getUsers()
    this.props.getPlans()
    this.props.history.push('/dashboard')
  }

  render() {
    return (
      <form className='flaker-form' onSubmit={this.handleSubmit}>
        <h1>LogIn</h1>
        <Input type='text' name='email' placeholder='E-Mail' value={this.state.email} onChange={this.handleChange}/>
        <Input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange}/>
        <Button>LogIn</Button>
      </form>
    )
  }
}

export default withRouter(connect(null, {postLogIn, getUsers, getPlans})(LogIn))
