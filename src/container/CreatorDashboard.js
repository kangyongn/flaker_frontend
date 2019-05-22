import React, {Component} from 'react';
import {connect} from 'react-redux';

import {NavLink} from 'react-router-dom';

import {Grid, Menu, Icon} from 'semantic-ui-react';

import CreatorMenu from '../component/creator/CreatorMenu';
import CreatorSegment from '../component/creator/CreatorSegment';

class CreatorDashboard extends Component {
  state = {
    active: '',
    add: false,
    finish: false
  }

  handleClick = (e, {value}) => {
    this.setState({
      active: value,
      add: false,
      finish: false
    })
  }

  handleAddClick = () => {
    this.setState({
      add: !this.state.add,
      finish: false
    })
  }

  handleFinishClick = () => {
    this.setState({
      add: false,
      finish: !this.state.finish
    })
  }

  handleFinishSubmit = () => {
    this.setState({
      active: ''
    })
  }

  render() {
    const active = this.props.plan.find(plan => plan.id === this.state.active)

    return (
      <React.Fragment>
        <h1 style={{'textAlign': 'center'}}>Creator Dashboard</h1>
        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>      
              <Menu.Item as={NavLink} to='create-plan'><Icon name='add'/>Create Plan</Menu.Item>
              <CreatorMenu active={active} handleClick={this.handleClick} handleAddClick={this.handleAddClick} handleFinishClick={this.handleFinishClick}/>
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            {active ?
              <CreatorSegment active={active} add={this.state.add} finish={this.state.finish} handleFinishSubmit={this.handleFinishSubmit}/>
              :
              null
            }
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    plan: state.plan.all
  }
}

export default connect(mapStateToProps)(CreatorDashboard)
