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
    this.state = {
      status: ''
    }
    this.changePassword= this.changePassword.bind(this);
  }

  changePassword (event) {
    event.preventDefault();
    var user = $(event.target).serializeArray();
    var userObj = {
      username: user[0].value,
      password: user[1].value
    }
    if (userObj.username === '' || userObj.password === '') {
      this.setState({
        status:
      })
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

  changeEmail (event) {
    event.preventDefault();
    var user = $(event.target).serializeArray();
    var userObj = {
      username: user[0].value,
      email: user[1].value
    }
    $('#loginUsername').val('');
    $('#loginEmail').val('');
    $.post('/changeEmail', userObj)
    .then(() => {
      console.log('Your email has been changed');
      this.setState({
        status: 'success'
      })
    })
    .catch(() => {
      console.log('Wrong username and password');
      this.setState({
        status: 'error'
      })
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
          <form className="ui form signupForm" onSubmit={(event) => {this.changeEmail(event)}}>
            <div className="field"> Change Email:
              <input type="text" name="username" id='loginUsername' placeholder="enter username"/>
            </div>
            <div className={`ui form ${this.state.status}`}>
              <input placeholder="enter new email" name="email"/>
            </div>
            
            <div class="ui error message">
              <div class="header">Action Forbidden</div>
              <p>You can only sign up for an account once with a given e-mail address.</p>
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