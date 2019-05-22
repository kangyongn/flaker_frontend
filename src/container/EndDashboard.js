import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Grid, Menu} from 'semantic-ui-react';

import EndMenu from '../component/end/EndMenu';
import EndSegment from '../component/end/EndSegment';

class EndDashboard extends Component {
  state = {
    active: '',
  }

  handleClick = (e, {value}) => {
    this.setState({
      active: value
    })
  }
  render() {
    const active = this.props.plan.find(plan => plan.id === this.state.active)

    return (
      <React.Fragment>
        <h1 style={{'textAlign': 'center'}}>End Dashboard</h1>
        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              <EndMenu active={this.state.active} handleClick={this.handleClick}/>
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            {active ?
              <EndSegment active={active}/>
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

export default connect(mapStateToProps)(EndDashboard)
