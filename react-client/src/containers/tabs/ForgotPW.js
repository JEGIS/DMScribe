import React, { Component } from 'react';
import $ from 'jquery';
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {selectTab, setUser, fetchGroups} from '../../actions/index';

const remote = 'https://png.icons8.com/ultraviolet/540/icosahedron.png';

class ForgotPW extends Component {
  constructor(props) {
    super(props);
    this.forgot = this.forgot.bind(this);
  }

  forgot (event) {
    event.preventDefault();
    var user = $(event.target).serializeArray();
    var userObj = {
      username: user[0].value,
      email: user[1].value
    }
    if (userObj.username === '') {
      alert('Enter username');
    } else if (userObj.email === '') {
      alert('Enter email');
    } else {
      $.get('/forgotPassword', userObj)
      .then((data) => {
        alert('Password has been sent: ', data);
        $('#username').val('');
        $('#email').val('');
      })
      .catch((res) => {
        if (res.status === 400) {
          alert('Username not found');
        } else if (res.status === 401) {
          alert('Email not found');
        } else if (res.status === 500) {
          alert('Could not connect to database');
        } else if (res.status === 501) {
          alert('Failed to send email');
        }
        $('#username').val('');
        $('#email').val('');
      })      
    }
  }

  render() {
    const resizeMode = 'center';
    if (this.props.currentTab !== 'ForgotPW') {
      return null;
    }
    return (
      <div>
        <Menu fixed='top' size='large' className='theme-background'>
          <Container>
            <Menu.Menu position='right'>
              <Menu.Item className='item'>
                <Button
                className='theme-text'
                onClick={() => {this.props.selectTab('Landing')}}
                as='a'>Back to landing page</Button>
              </Menu.Item>
              <Menu.Item className='item'>
                <Button
                className='theme-text'
                onClick={() => {this.props.selectTab('Login')}}
                as='a'>Log in</Button>
              </Menu.Item>
              <Menu.Item>
                <Button 
                className='theme-text'
                onClick={() => {this.props.selectTab('Signup')}}
                as='a' 
                primary>Sign Up</Button>
              </Menu.Item>
              <Menu.Item>
                <Button 
                className='theme-text'
                onClick={() => {this.props.selectTab('ForgotPW')}}
                as='a' 
                primary>Forgot password?</Button>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
          <Grid centered columns={5}>
            <Grid.Column className="theme-text">
              <form className="ui form signupForm" onSubmit={(event) => {this.forgot(event)}}>
                <div className="field">
                  <label>Username:</label>
                  <input type="text" name="username" placeholder="enter username" id="username"/>
                </div>
                <div className="field">
                  <label>Email:</label>
                  <input type="text" name="email" placeholder="enter email" id="email"/>
                </div>
                <button className="ui button theme-text" type="submit">Get new password</button>
              </form>
            </Grid.Column>
          </Grid>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    currentTab: state.currentTab
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectTab: selectTab
    //setUser: setUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPW);
