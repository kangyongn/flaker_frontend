import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {postSignUp, getUsers} from '../adapter/UserAdapter';

import {Input, Button} from 'semantic-ui-react';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.getUsers()
    this.props.postSignUp(this.state)
    this.props.history.push('/creator-dashboard')
  }

  render() {
    return (
      <form className='flaker-form'onSubmit={this.handleSubmit}>
        <h1>SignUp</h1>
        <Input type='text' name='email' placeholder='E-Mail' value={this.state.email} onChange={this.handleChange}/>
        <Input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange}/>
        <Input type='password' name='password_confirmation' placeholder='Confirm Password' value={this.state.password_confirmation} onChange={this.handleChange}/>
        <Input type='text' name='first_name' placeholder='First Name' value={this.state.first_name} onChange={this.handleChange}/>
        <Input type='text' name='last_name' placeholder='Last Name' value={this.state.last_name} onChange={this.handleChange}/>
        <Button>SignUp</Button>
      </form>
    )
  }
}

export default withRouter(connect(null, {postSignUp, getUsers})(SignUp))
