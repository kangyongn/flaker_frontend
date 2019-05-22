import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Dropdown, Button} from 'semantic-ui-react';

import {postInvite} from '../../adapter/EntryAdapter';

class CreatorSelect extends Component {
  state = {
    users: []
  }

  handleChange = (e, data) => {
    this.setState({
      users: data.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const plan = this.props.plan.find(plan => plan.id === this.props.active.id)
    const invites = this.props.user.all.filter(user => this.state.users.includes(user.id))
    const mapInvites = plan => {
      invites.map(user => this.props.postInvite(user, plan))
    }
    mapInvites(plan)
  }

  render() {
    const attendingEntries = this.props.active.entries.filter(entry => entry.attending === true && entry.user_id !== this.props.user.current.id)
    const userIds = attendingEntries.map(entry => entry.user_id)

    const nonAttendingUsersId = this.props.user.all.filter(user => !userIds.includes(user.id))
    const availableUsers = nonAttendingUsersId.filter(user => user.id !== this.props.active.creator_id)
    const availableUsersId = availableUsers.map(user => user.id)
    const entriesUserId = this.props.active.entries.map(entry => entry.user_id)
    const nonInvitedUsersId = availableUsersId.filter((userId) => !entriesUserId.includes(userId))
    const nonInvitedUsers = this.props.user.all.filter(user => nonInvitedUsersId.includes(user.id))

    const userOptions = nonInvitedUsers.map(user => {
      return {
        text: user.name,
        value: user.id
      }
    })

    return (
      <form onSubmit={this.handleSubmit}>
        <div className='flaker-select'>
          <Dropdown
            placeholder='Users'
            fluid
            multiple
            search
            selection
            options={userOptions}
            onChange={this.handleChange}
          />
          <Button>Add User</Button>
        </div>
      </form>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    plan: state.plan.all
  }
}

export default connect(mapStateToProps, {postInvite})(CreatorSelect)
