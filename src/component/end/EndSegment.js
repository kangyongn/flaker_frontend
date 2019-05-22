import React from 'react';
import {connect} from 'react-redux';

import {Segment, Icon} from 'semantic-ui-react';

const EndSegment = props => {
  const attendingEntries = props.active.entries.filter(entry => entry.attending === true)
  const successfulEntries = attendingEntries.filter(entry => entry.payout)

  const payout = successfulEntries[0] ? successfulEntries[0].payout : 0

  const renderUsers = attendingEntries.map(entry => {
    if(entry.payout) {
      const user = props.user.all.find(user => entry.user_id === user.id)
      return <li key={user.id}>{props.active.creator_id === user.id ? `${user.name} (Creator)` : user.name} <Icon name='check' color='green'/></li>
    } else {
      const user = props.user.all.find(user => entry.user_id === user.id)
      return <li key={user.id}><strike className='flaker'>{props.active.creator_id === user.id ? `${user.name} (Creator)` : user.name}</strike></li>
    }
  })

  return (
    <Segment>
      <h1>{props.active.name}</h1>
      <h3>Attendees: {attendingEntries.filter(entry => entry.payout).length}</h3>
      <h3>Payout: $ {payout}</h3>
      <h3>Attendance List</h3>
      <ul>{renderUsers}</ul>
    </Segment>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(EndSegment)
