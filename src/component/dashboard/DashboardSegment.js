import React from 'react';

import {connect} from 'react-redux';

import {patchEntry, deleteEntry} from '../../adapter/EntryAdapter';

import {Segment, Icon, Button} from 'semantic-ui-react';

import {CardElement, injectStripe} from 'react-stripe-elements';

const DashboardSegment = props => {
  const handleAccept = async (entry, plan) => {
    const {token} = await props.stripe.createToken({id: props.user.current.id})
    await fetch('http://localhost:3000/api/v1/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount: (plan.cost * 100), id: plan.creator_id, stripeToken: token.id})
    })
    await props.patchEntry(entry.id)
  }

  const attending = plan => {
    const entries = plan.entries.filter(entry => entry.attending === true && entry.user_id !== props.user.current.id && plan.creator_id !== entry.user_id)
    const ids = entries.map(entry => entry.user_id)
    const users = props.user.all.filter(user => ids.includes(user.id))

    const render = users.map(user => <li key={user.id}>{user.name}</li>)

    return (
      <ul>
        {render}
      </ul>
    )
  }

  const stripeUrl = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_EwmL3WIkrp6NYggrQouufNg2VodKcbhW&scope=read_write&redirect_uri=http://localhost:3000/api/v1/oauth/callback&state=${props.user.current.id}`

  return (
    <React.Fragment>
      <Segment attached='top'>
        <h1>
          {props.plan ? props.plan.name : null}
          {props.entry ?
            props.entry.attending ? <Icon name='calendar check' color='green'/> : null
            :
            null
          }
        </h1>

        <h3>{props.plan ? <i>Creator: {props.user.all.find(user => user.id === props.plan.creator_id).name}</i> : null}</h3>
        {props.entry ?
          props.entry.attending ?
            null
            :
            props.user.current.stripeId ?
              <div>
                <CardElement />
                <Button
                  basic
                  color='green'
                  content='Accept'
                  icon='check'
                  label={{basic: true, color: 'green', pointing: 'left', content: `$ ${props.plan.cost}`}}
                  onClick={() => handleAccept(props.entry, props.plan)}
                />
                <Button
                  basic
                  color='red'
                  content='Decline'
                  onClick={() => props.deleteEntry(props.entry.id)}
                />
              </div>
              :
              <a href={stripeUrl}>
                <Button>Stripe</Button>
              </a>
          :
          null
        }
        <h3>{props.plan ? 'Attending' : null}</h3>
        {props.plan ?
          attending(props.plan)
          :
          null
        }
      </Segment>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default injectStripe(connect(mapStateToProps, {patchEntry, deleteEntry})(DashboardSegment))
