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
      username: '',
      email: '',
      password: ''
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
    if (userObj.username === '') {
      this.setState({
        username: 'error'
      })
    } else if (userObj.password === '') {
      this.setState({
        password: 'error'
      })      
    } else {
      $('#loginUsername').val('');
      $('#loginPassword').val('');
      $.post('/changePassword', userObj)
      .then((res) => {
        this.setState({
          username: res,
          password: res
        })
      })
      .catch(() => {
        console.log('Wrong username');
        this.setState({
          username: 'error'
        })
      })
    }
  }

  changeEmail (event) {
    event.preventDefault();
    var user = $(event.target).serializeArray();
    var userObj = {
      username: user[0].value,
      email: user[1].value
    }
    if (userObj.username === '') {
      this.setState({
        username: 'error'
      })
    } else if (userObj.email === '') {
      this.setState({
        email: 'error'
      })
    } else {
      $('#loginUsername').val('');
      $('#loginEmail').val('');
      $.post('/changeEmail', userObj)
      .then((res) => {
        this.setState({
          username: res,
          email: res
        })
      })
      .catch(() => {
        console.log('Wrong username');
        this.setState({
          username: 'error'
        })
      })
    }
  }

  render () {
    if (this.props.currentTab !== 'AccountInfo') {
      return null;
    }
    return (
      <Grid centered columns={6}>
        <Grid.Column> Account Management
          <form className="ui form signupForm" onSubmit={(event) => {this.changePassword(event)}}>
            <div className={`field ${this.state.username}`}> Change Password:
              <input type="text" name="username" id='loginUsername' placeholder="enter username"/>
            </div>
            <div className={`ui form ${this.state.password}`}>
              <input placeholder="enter new password" name="password"/>
            </div>
            <span><button className="ui button" type="submit">Submit</button></span>
          </form>
          <form className="ui form signupForm" onSubmit={(event) => {this.changeEmail(event)}}>
            <div className={`field ${this.state.username}`}> Change Email:
              <input type="text" name="username" id='loginUsername' placeholder="enter username"/>
            </div>
            <div className={`field ${this.state.email}`}>
              <input placeholder="enter new email" name="email"/>
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