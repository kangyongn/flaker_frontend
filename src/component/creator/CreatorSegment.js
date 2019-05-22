import React from 'react';
import {connect} from 'react-redux';

import {Segment} from 'semantic-ui-react';

import CreatorSelect from './CreatorSelect';
import CreatorFinish from './CreatorFinish';

import {StripeProvider, Elements} from 'react-stripe-elements';

const CreatorSegment = props => {
  const attendingEntries = props.active.entries.filter(entry => entry.attending === true && entry.user_id !== props.user.current.id)
  const attendingIds = attendingEntries.map(entry => entry.user_id)
  const attendingUsers = props.user.all.filter(user => attendingIds.includes(user.id))

  const pendingEntries = props.active.entries.filter(entry => entry.attending === false && entry.user_id !== props.user.current.id)
  const pendingIds = pendingEntries.map(entry => entry.user_id)
  const pendingUsers = props.user.all.filter(user => pendingIds.includes(user.id))

  const renderUsers = attendingUsers.map(user => <li key={user.id}>{user.name}</li>)
  const renderPending = pendingUsers.map(user => <li key={user.id}>{user.name}</li>)

  return (
    <Segment>
      <h1>{props.active.name}</h1>
      <h3>Attending</h3>
      <ul>{renderUsers}</ul>
      <h3>Pending</h3>
      <ul>{renderPending}</ul>
      {props.add ? <CreatorSelect active={props.active}/> : null}
      {props.finish ?
        <StripeProvider apiKey='pk_test_FSRfhLIrttg50RdN9s1xt4Xr00mUF63Xd8'>
          <Elements>
            <CreatorFinish active={props.active} handleFinishSubmit={props.handleFinishSubmit}/>
          </Elements>
        </StripeProvider>
        :
        null
      }
    </Segment>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CreatorSegment)
