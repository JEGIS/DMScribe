import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayersList from '../PlayersList';
import MonstersList from '../MonstersList';
import OrderList from '../orderList';
import OrderButton from '../buttons/OrderButton';
import ClearMonsters from '../buttons/ClearMonsters';
import DropdownExampleSearchSelection from '../SearchBar';
import $ from 'jquery';
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

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.changePassword= this.changePassword.bind(this);
  }

  changePassword (event) {
    event.preventDefault();
    var user = $(event.target).serializeArray();
    var userObj = {
      username: user[0].value,
      password: user[1].value
    }
    $('#loginUsername').val('');
    $('#loginPassword').val('');
    $.post('/changePassword', userObj)
    .then(() => {
      console.log('Your password has been changed');
    })
    .catch(() => {
      console.log('Wrong username and password');
    })
  }

  render () {
    if (this.props.currentTab !== 'AccountInfo') {
      return null;
    }
    return (
      <Grid centered columns={6}>
        <Grid.Column> Account Management
          <form className="ui form signupForm" onSubmit={(event) => {this.changePassword(event)}}>
            <div className="field"> Change Password:
              <input type="text" name="username" id='loginUsername' placeholder="enter username"/>
            </div>
            <div className="field">
              <input placeholder="enter new password" name="password"/>
            </div>
            <span><button className="ui button" type="submit">Submit</button></span>
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