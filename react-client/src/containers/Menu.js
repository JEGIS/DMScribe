import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {selectTab, setUser, logoutReset} from '../actions/index';
import styles from 'styled-components';
import { Icon, Container, Button, Menu } from 'semantic-ui-react';

const Wrapper = styles.div`
  margin: .7% 8%;
`;


var tabs = ['Arena', 'Players', 'Monsters'];

class MenuX extends Component {
  render () {
    if (this.props.currentTab === 'Landing' 
      || this.props.currentTab === 'Login'
      || this.props.currentTab === 'Signup'
      || this.props.currentTab === 'ForgotPW') {
      return null;
    }

  	return(
      <Wrapper className="menuBar">
      <div className="theme-background">
        {this.props.user 
          ?
          <Menu fixed='top' size='large' className='theme-background'>
            <Container>
              <Menu.Menu position='right'>
                <Menu.Item className='item'>
                  <Button
                  className="theme-text theme-button"
                  onClick={() => {this.props.selectTab('Arena')}}
                  as='a'> Home </Button>
                </Menu.Item>
                <Menu.Item className='item'>
                  <Button
                  className="theme-text theme-button" 
                  onClick={() => {this.props.selectTab('AccountInfo')}}
                  as='a'> {this.props.user}
                  <i className="setting icon"></i>
                  </Button>
                </Menu.Item>
                <Menu.Item className='item'>
                  <Button 
                  className="theme-text theme-button"
                  onClick={() => {
                    this.props.setUser('');
                    this.props.logoutReset();
                    this.props.selectTab('Landing');
                  }}
                  as='a'> Log out! </Button>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
          :
          <Menu fixed='top' size='large' className='theme-background'>
            <Container>
              <Menu.Menu position='right'>
                <Menu.Item className='item'>
                  <Button
                  className="theme-text theme-button"
                  onClick={() => {this.props.selectTab('Arena')}}
                  as='a'> DM-Scribe </Button>
                </Menu.Item>
                <Menu.Item className='item'>
                  <Button
                  className="theme-text theme-button" 
                  onClick={() => {this.props.selectTab('Login')}}
                  as='a'> Login </Button>
                </Menu.Item>
                <Menu.Item className='item'>
                  <Button 
                  className="theme-text theme-button"
                  onClick={() => {this.props.selectTab('Signup')}}
                  as='a'> Sign up </Button>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
          }
        </div>
      </Wrapper>
		);
  }
}

function mapStateToProps (state) {
  return {
    currentTab: state.currentTab,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectTab: selectTab,
    setUser: setUser,
    logoutReset: logoutReset
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuX);


