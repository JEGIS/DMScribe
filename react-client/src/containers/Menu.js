import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {selectTab, setUser, logoutReset} from '../actions/index';
import styles from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Wrapper = styles.div`
  margin: .7% 8%;
`;


var tabs = ['Arena', 'Players', 'Monsters'];

class Menu extends Component {
  render () {
    if (this.props.currentTab === 'Landing' 
      || this.props.currentTab === 'Login'
      || this.props.currentTab === 'Signup'
      || this.props.currentTab === 'ForgotPW') {
      return null;
    }

  	return(
      <Wrapper>
      <div className="theme-background">
        {this.props.user 
          ?
            <div className="ui menu theme-background">

              <a
                className='item theme-text'
                onClick={() => {this.props.selectTab('AccountInfo')}}
                >{this.props.user}
                <i className="setting icon"></i>
              </a>
              <div className="logo theme-text"> DM-Scribe</div>
              <a
                onClick={() => {
                  this.props.setUser('');
                  this.props.logoutReset();
                  this.props.selectTab('Landing');
                }}
                className="item theme-text"
              >Log out!</a>
            </div>  
          :
            <div className="ui menu theme-background">
              <a
                className="item theme-text" 
                onClick={() => {this.props.selectTab('Login')}}
              >Login</a>
              <div className="logo theme-text"> DM-Scribe</div>
              <a
                onClick={() => {this.props.selectTab('Signup')}}
                className="item theme-text"
              >Sign up</a>
            </div>  
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
