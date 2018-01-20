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
import {selectTab, setUser} from '../../actions/index';

const remote = 'https://png.icons8.com/ultraviolet/540/icosahedron.png';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  signUp (event) {
    event.preventDefault();
    var user = $(event.target).serializeArray();
    var userObj = {
      username: user[0].value,
      password: user[1].value,
      email: user[2].value
    }
    if (userObj.username === '') {
      alert('Enter username')
    } else if (userObj.password === '') {
      alert('Enter password')
    //} else if (userObj.email === '') {
    //  alert('Enter email')
    } else {
      $.post('/signUp', userObj)
      .then((res) => {
        this.props.setUser(userObj.username);
        this.props.selectTab('Arena');
      })
      .catch((res) => {
        if (res.status === 500) {
          alert('Username already taken');
        }
        $('#signUpUsername').val('');
        $('#signUpPassword').val('');
        $('#signUpEmail').val('');
      })
    }
  }

  render() {
    const resizeMode = 'center';
    if (this.props.currentTab !== 'Signup') {
      return null;
    }

    return (
        <div>
          <img src="https://i.imgur.com/f60kcjD.jpg" id="bg" alt=""/>
          <Menu fixed='top' size='large' className='theme-background'>
            <Container>
              <Menu.Menu position='right'>
                <Menu.Item className='item theme-text'>
                  <Button
                  className="theme-text theme-button"
                  onClick={() => {this.props.selectTab('Landing')}}
                  as='a'>Back to landing page</Button>
                </Menu.Item>
                <Menu.Item className='item'>
                  <Button 
                  className="theme-text theme-button"
                  onClick={() => {this.props.selectTab('Login')}}
                  as='a'>Log in</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button 
                  className="theme-text theme-button"
                  onClick={() => {this.props.selectTab('Signup')}}
                  as='a'>Sign Up</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button 
                  className="theme-text theme-button"
                  onClick={() => {this.props.selectTab('ForgotPW')}}
                  as='a'>Forgot password?</Button>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
          <Grid centered columns={5}>
            <Grid.Column className="theme-text">
              <form className="ui form signupForm" onSubmit={(event) => {this.signUp(event)}}>
                <div className="field">
                  <label>Username:</label>
                  <input type="text" name="username" id='signUpUsername'/>
                </div>
                <div className="field">
                  <label>Password:</label>
                  <input type="password" name="password" id='signUpPassword'/>
                </div>
                <div className="field">
                  <label>Email:</label>
                  <input type="text" name="email" placeholder="example@gmail.com (optional)" id='signUpEmail'/>
                </div>
                <span><button className="ui button theme-text theme-button" type="submit">Sign up!!</button></span>
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
    selectTab: selectTab,
    setUser: setUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
