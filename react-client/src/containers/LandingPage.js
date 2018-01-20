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
  Link
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {selectTab} from '../actions/index';

const remote = 'https://png.icons8.com/ultraviolet/540/icosahedron.png';

class LandingPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    const resizeMode = 'center';
      if (this.props.currentTab !== 'Landing') {
        return null;
      }

  		return (
        <div>
          <img src="https://i.imgur.com/f60kcjD.jpg" id="bg" alt=""/>
          <div className="ui grid">
            <Container>
              <Header
                as='h1'
                content='DM-Scribe'
                inverted
                style={{ backgroundColor: 'transparent', fontSize: '4em', fontWeight: 'normal', color:'white', marginBottom: 0, marginTop: '3em' }}
              />
              <Header
                as='h2'
                content='The handy tool for the unorganized DM'
                inverted
                style={{ backgroundColor: 'transparent', fontSize: '1.7em', color:'white', fontWeight: 'normal' }}
              />
              <Button 
              className="theme-text theme-button"
              onClick={() => {this.props.selectTab('Arena')}}
              size='huge'>
                Roll for Initiative!
                <Icon name='right arrow'/>
              </Button>
              <img id="landing-image" className="ui large right floated image" src="https://png.icons8.com/ultraviolet/540/icosahedron.png"/>
            </Container>
          </div>
          <Menu fixed='top' size='large' className='theme-background'>
            <Container>
              <Menu.Menu position='right'>
                <Menu.Item className='item'>
                  <Button
                  className="theme-text theme-button"
                  onClick={() => {this.props.selectTab('Login')}}
                  as='a'>Log in!</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button 
                  className="theme-text theme-button"
                  onClick={() => {this.props.selectTab('Signup')}}
                  as='a'>Sign Up!</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button 
                    className="theme-text theme-button"
                    onClick={() => {this.props.selectTab('ForgotPW')}}
                    as='a'>Forgot password?
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>

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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

