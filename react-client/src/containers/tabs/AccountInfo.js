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
import { Button, Grid, Form } from 'semantic-ui-react';

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.changePassword = this.changePassword.bind(this);
  }

  changePassword (event) {
    event.preventDefault();
    var user = $(event.target).serializeArray();
    var userObj = {
      username: user[0].value,
      email: user[1].value,
      password: user[2].value
    }
    console.log(userObj.username, userObj.email, userObj.password )
    if (userObj.username === '') {
      alert('Enter your username');
    } else if (userObj.email === '') {
      alert('Enter your email');
    } else if (userObj.password === '') {
      alert('Enter your password');
    } else {
      $.post('/changePassword', userObj)
      .then((res) => {
        alert('Your password has been changed')
        $('#username1').val('');
        $('#email1').val('');
        $('#password1').val('');
      })
      .catch((res) => {
        if (res.status === 400) {
          alert('Username not found');
        } else if (res.status === 401) {
          alert('Incorrect email');
        } else if (res.status === 500) {
          alert('Could not connect to database');
        }
        $('#username1').val('');
        $('#email1').val('');
        $('#password1').val('');
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
      alert('Enter your username');
    } else if (userObj.email === '') {
      alert('Enter your email');
    } else {
      $.post('/changeEmail', userObj)
      .then((res) => {
        alert(res);
        $('#username2').val('');
        $('#email2').val('');
      })
      .catch(() => {
        alert('Could not reach server');
        $('#username2').val('');
        $('#email2').val('');
      })
    }
  }

  render () {
    if (this.props.currentTab !== 'AccountInfo') {
      return null;
    }
    return (
      <Grid centered columns={3}>
        <Grid.Column className="test">

          <Form className="ui form signupForm" onSubmit={(event) => {this.changePassword(event)}}>
            <div> Change Password:
              <input placeholder="confirm username" name="username" id="username1"/>
            </div>
            <div>
              <input placeholder="confirm email" name="email" id="email1"/>
            </div>
            <div>
              <input placeholder="new password" name="password" id="password1"/>
            </div>
            <span><Button className="ui button" type="submit">Submit</Button></span>
          </Form>

          <Form className="ui form signupForm" onSubmit={(event) => {this.changeEmail(event)}}>
            <div> Change Email:
              <input placeholder="enter username" name="username" id="username2"/>
            </div>
            <div>
              <input placeholder="enter new email" name="email" id="email2"/>
            </div>
            <Button className="ui button" type="submit">Submit</Button>
          </Form>

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
