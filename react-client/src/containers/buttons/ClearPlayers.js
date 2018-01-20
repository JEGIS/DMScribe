import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {clearPlayersField, clearOrderField} from '../../actions/index';

class ClearPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
    this.toggleOn = this.toggleOn.bind(this);
    this.toggleOff = this.toggleOff.bind(this);
  }

  toggleOn () {
    this.setState({toggle: true});
  }

  toggleOff () {
    this.setState({toggle: false});
  }

  render () {
    if (this.props.players.length === 0) {
      return null;
    }

  	return(
      <Modal 
        trigger={<Button className="theme-text theme-button" onClick={this.toggleOn}>Clear Players</Button>}
        basic size='small'
        open={this.state.toggle}
        onClose={this.toggleOff}
      >
        <Modal.Header icon='archive' content='Clear Players' />
        <Modal.Content>
          <p>Are you sure you want to remove all players?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.toggleOff} color='red' inverted>
            <Icon name='remove' /> No
          </Button>
          <Button
            color='green'
            inverted
            onClick={() => {
              this.toggleOff();
              clearPlayersField();
              clearOrderField();
            }}
          >
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
  		)
  }
}

function mapStateToProps (state) {
  return {
    players: state.players
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ clearPlayersField, clearOrderField }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearPlayers);