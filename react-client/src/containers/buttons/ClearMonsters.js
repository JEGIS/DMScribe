import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {clearMonstersField, clearOrderField} from '../../actions/index';

class ClearMonsters extends Component {
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
    if (this.props.monsters.length === 0) {
      return null;
    }
    
  	return(
      <Modal 
        trigger={<Button onClick={this.toggleOn}>Clear Monsters</Button>}
        basic size='small'
        open={this.state.toggle}
        onClose={this.toggleOff}
      >
        <Modal.Header icon='archive' content='Clear Monsters' />
        <Modal.Content>
          <p>Are you sure you want to remove all monsters?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.toggleOff} color='red' inverted>
            <Icon name='remove' /> No
          </Button>
          <Button
            color='green'
            inverted
            onClick={() => {
              this.toggleOff;
              clearMonstersField();
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
    monsters: state.monsters
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ clearMonstersField, clearOrderField }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearMonsters);