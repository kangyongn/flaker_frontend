import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Dropdown, Button} from 'semantic-ui-react';

import {injectStripe} from 'react-stripe-elements';

import {patchPayout} from '../../adapter/EntryAdapter';
import {patchPlan} from '../../adapter/PlanAdapter';
import {getStripe} from '../../adapter/StripeAdapter';

class CreatorFinish extends Component {
  state = {
    users: [],
  }

  handleChange = (e, data) => {
    this.setState({
      users: data.value
    })
  }

  postTransfers = async (amount, id) => {
    await fetch('https://flaker-backend.herokuapp.com/api/v1/transfers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount: Math.round(amount * 100), id: id})
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const share = (this.props.active.pool - (this.props.active.pool * 0.054) - (this.state.users.length * 0.30))/this.state.users.length
    const amount = Math.round(share * 100) / 100

    const attended = this.props.active.entries.filter(entry => this.state.users.includes(entry.user_id))
    attended.map(entry => this.props.patchPayout(entry.id, amount))
    this.props.patchPlan(this.props.active.id)

    this.state.users.map(id => this.postTransfers(amount, id))

    this.props.getStripe(this.props.user.current.stripeId)

    this.props.handleFinishSubmit()
  }

  render() {
    const attendingEntries = this.props.active.entries.filter(entry => entry.attending === true)
    const attendingIds = attendingEntries.map(entry => entry.user_id)
    const attendingUsers = this.props.user.all.filter(user => attendingIds.includes(user.id))

    const userOptions = attendingUsers.map(user => {
      return {
        text: user.id === this.props.user.current.id ? `${user.name} (Me)` : user.name,
        value: user.id
      }
    })

    return (
      <form onSubmit={this.handleSubmit}>
        <div className='flaker-select'>
          <Dropdown
            placeholder='Attended'
            fluid
            multiple
            search
            selection
            options={userOptions}
            onChange={this.handleChange}
          />
          <Button>Finish</Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default injectStripe(connect(mapStateToProps, {patchPayout, patchPlan, getStripe})(CreatorFinish))
