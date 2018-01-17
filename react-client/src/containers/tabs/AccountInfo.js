import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayersList from '../PlayersList';
import MonstersList from '../MonstersList';
import OrderList from '../orderList';
import OrderButton from '../buttons/OrderButton';
import ClearMonsters from '../buttons/ClearMonsters';
import DropdownExampleSearchSelection from '../SearchBar';
import styles from 'styled-components';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';


const Wrapper = styles.div`
  margin: .7% 8%;
`;



class AccountInfo extends Component {
  render () {
    if (this.props.currentTab !== 'AccountInfo') {
      return null;
    }
    return (
          <Grid centered columns={6}>
            <Grid.Column>
              <form className="ui form signupForm" onSubmit={(event) => {this.login(event)}}>
                <div className="field">
                  <label>Username:</label>
                  <input type="text" name="username" id='loginUsername'/>
                </div>
                <div className="field">
                  <label>Password:</label>
                  <input type="password" name="password" id='loginPassword'/>
                </div>
                <span><button className="ui button" type="submit">Login!</button></span>
              </form>
            </Grid.Column>
          </Grid>
    );
  }
}

function mapStateToProps (state) {
  return {
    monsters: state.monsters,
    players: state.players,
    currentTab: state.currentTab
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);