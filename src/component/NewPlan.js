import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown, Input, Label, Button} from 'semantic-ui-react';

import {postPlan} from '../adapter/PlanAdapter';
import {postEntry, postInvite} from '../adapter/EntryAdapter';

import {CardElement, injectStripe} from 'react-stripe-elements';

class NewPlan extends Component {
  state = {
    name: '',
    cost: null,
    attending: true,
    users: []
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  postCharge = async () => {
    const{token} = await this.props.stripe.createToken({id: this.props.currentUserId})
    await fetch('https://flaker-backend.herokuapp.com/api/v1/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount: (this.state.cost * 100), id: this.props.currentUserId, stripeToken: token.id})
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const info = {creator_id: this.props.currentUserId, ...this.state}
    const invites = this.props.user.all.filter(user => this.state.users.includes(user.id))
    const mapInvites = plan => {
      invites.map(user => this.props.postInvite(user, plan))
    }
    this.props.postPlan(info)
    .then(plan => {
      this.props.postEntry(info, plan)
      mapInvites(plan)
      this.postCharge()
    })
    .then(() => this.props.history.push('/creator-dashboard'))
  }

  handleSelect = (e, data) => {
    this.setState({
      users: data.value
    })
  }

  userOptions = () => {
    const otherUsers = this.props.user.all.filter(user => user.id !== this.props.currentUserId)
    return otherUsers.map(user => {
      return {
        text: user.name,
        value: user.id
      }
    })
  }

  render() {
    const stripeUrl = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_EwmL3WIkrp6NYggrQouufNg2VodKcbhW&scope=read_write&redirect_uri=https://flaker-backend.herokuapp.com/api/v1/oauth/callback&state=${this.props.currentUserId}`

    return (
      this.props.user.current.stripeId ?
        <form className='flaker-form' onSubmit={this.handleSubmit}>
          <h1>Create Plan</h1>
          <Input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
          <Input labelPosition='right' type='number' name='cost' placeholder='Amount' value={this.state.cost} onChange={this.handleChange}>
            <Label basic>$</Label>
            <input/>
            <Label>.00</Label>
          </Input>
          <Dropdown
            placeholder='Users'
            fluid
            multiple
            search
            selection
            options={this.userOptions()}
            onChange={this.handleSelect}
          />
          <CardElement/>
          <Button>Create Plan</Button>
        </form>
        :
        <div style={{'textAlign': 'center'}}>
          <h1>Create Plan</h1>
          <a href={stripeUrl}>
            <Button>Stripe</Button>
          </a>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentUserId: state.user.current.id
  }
}

export default injectStripe(connect(mapStateToProps, {postPlan, postEntry, postInvite})(NewPlan))
