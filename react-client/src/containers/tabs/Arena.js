import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button, Icon } from 'semantic-ui-react'
import PlayersList from '../PlayersList';
import MonstersList from '../MonstersList';
import OrderList from '../orderList';
import { addCustomMonster, clearSelectedMonster, addPlayer, fetchClassImg } from '../../actions/index';
import DiceRoller from '../DiceRoller';
import OrderButton from '../buttons/OrderButton';
import ClearPlayers from '../buttons/ClearPlayers';
import ClearMonsters from '../buttons/ClearMonsters';
import DropdownExampleSearchSelection from '../SearchBar';
import styles from 'styled-components';

const Wrapper = styles.div`
  margin: .7% 8%;
`;

class Arena extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      players: [],
      monsterModal: false,
      playerModal: false,
      monsterExtraModal: false,
    };
    this.onMonsterFormSubmit = this.onMonsterFormSubmit.bind(this);
    this.onPlayerFormSubmit = this.onPlayerFormSubmit.bind(this);
    this.onPlayerSave = this.onPlayerSave.bind(this);
    this.openMonster = this.openMonster.bind(this);
    this.closeMonster = this.closeMonster.bind(this);
    this.openPlayer = this.openPlayer.bind(this);
    this.closePlayer = this.closePlayer.bind(this);
    this.openMonsterExtra = this.openMonsterExtra.bind(this);
    this.closeMonsterExtra = this.closeMonsterExtra.bind(this);
  }

  onMonsterFormSubmit (event) {
    event.preventDefault();
    var monsterArr = $(event.target).serializeArray();
    var resultsObj = {};
    for (var i = 0; i < monsterArr.length; i++) {
      resultsObj[monsterArr[i].name] = monsterArr[i].value;
    }
    addCustomMonster(resultsObj);
    this.setState({monsterModal: false});
  }

  onPlayerFormSubmit (event) {
    event.preventDefault();
    var playerArr = $(event.target).serializeArray();
    var resultsObj = {};
    for (var i = 0; i < playerArr.length; i++) {
      resultsObj[playerArr[i].name] = playerArr[i].value;
    }
    addPlayer(resultsObj);
    this.setState({playerModal: false});
  }

  onPlayerSave (event) {
    event.preventDefault();
    var playerArr = $(event.target).serializeArray();
    var resultsObj = {};
    for (var i = 0; i < playerArr.length; i++) {
      resultsObj[playerArr[i].name] = playerArr[i].value;
    }
    resultsObj.dm = this.props.user;
    console.log(resultsObj);
    addPlayer(resultsObj);
    fetchClassImg(resultsObj.class)
    .then((res) => {
      resultsObj.image = res;
      $.post('/savePlayer', resultsObj)
    })
    this.setState({playerModal: false});
  }

  openMonster () {
    this.setState({monsterModal: true});
  }

  closeMonster () {
    this.setState({monsterModal: false});
  }

  openMonsterExtra () {
    this.setState({monsterExtraModal: true});
  }

  closeMonsterExtra () {
    this.setState({monsterExtraModal: false});
  }

  openPlayer () {
    this.setState({playerModal: true});
  }

  closePlayer () {
    this.setState({playerModal: false});
  }

  render () {
    if (this.props.currentTab !== 'Arena') {
      return null;
    }

    return (
      <Wrapper>
      <div>
        <DropdownExampleSearchSelection />
        <DiceRoller />
        <div className="buttonsWrapper">
          {/* <OrderButton /> */}
          <Modal 
            trigger={<Button className="theme-text" onClick={this.openMonster}>Create a Monster</Button>}
            open={this.state.monsterModal}
            onClose={this.closeMonster}
          >
            <Modal.Header>
              Create a Monster
            </Modal.Header>
            <Modal.Content>
              <form className="ui form monsterFormButton" onSubmit={this.onMonsterFormSubmit}>
                <div className="field">
                  <label>Name:</label>
                  <input type="text" name="name"/>
                </div>
                <div className="field">
                  <label>AC:</label>
                  <input type="text" name="armor_class"/>
                </div>
                <div className="field">
                  <label>HP:</label>
                  <input type="text" name="hit_points"/>
                </div>
                <div className="field">
                  <label>INIT:</label>
                  <input type="text" name="init"/>
                </div>
                <div className="field">
                  <label>Strength:</label>
                  <input type="text" name="strength"/>
                </div>
                <div className="field">
                  <label>Dexterity:</label>
                  <input type="text" name="dexterity"/>
                </div>
                <div className="field">
                  <label>Constitution:</label>
                  <input type="text" name="constitution"/>
                </div>
                <div className="field">
                  <label>Wisdom:</label>
                  <input type="text" name="wisdom"/>
                </div>
                <div className="field">
                  <label>Charisma:</label>
                  <input type="text" name="charisma"/>
                </div>
                <div className="field">
                  <label>Image:</label>
                  <input type="text" name="image"/>
                </div>
                <span><button className="ui button" type="submit">Submit</button></span>
              </form>
            </Modal.Content>
          </Modal>
          <Modal 
            trigger={<Button className="theme-text" onClick={this.openPlayer}>Create a Player</Button>}
            open={this.state.playerModal}
            onClose={this.closePlayer}
          >
            <Modal.Header>
              Create a Player
            </Modal.Header>
            <Modal.Content>
              <form className="ui form" onSubmit={this.props.user ? this.onPlayerSave : this.onPlayerFormSubmit}>
                <div className="field">
                  <label>Name:</label>
                  <input type="text" name="name"/>
                </div>
                <div className="field">
                  <label>Class:</label>
                  <select className="ui fluid dropdown" name="class"> className='theme-text'
                    <option value="">Class</option>
                    <option value="Barbarian">Barbarian</option>
                    <option value="Bard">Bard</option>
                    <option value="Cleric">Cleric</option>
                    <option value="Druid">Druid</option>
                    <option value="Fighter">Fighter</option>
                    <option value="Monk">Monk</option>
                    <option value="Paladin">Paladin</option>
                    <option value="Ranger">Ranger</option>
                    <option value="Rogue">Rogue</option>
                    <option value="Sorcerer">Sorcerer</option>
                    <option value="Warlock">Warlock</option>
                    <option value="Wizard">Wizard</option>
                  </select>
                </div>
                <div className="field">
                  <label>AC:</label>
                  <input type="text" name="armor_class"/>
                </div>
                <div className="field">
                  <label>HP:</label>
                  <input type="text" name="hit_points"/>
                </div>
                <div className="field">
                  <label>Initiative</label>
                  <input type="text" name="init"/>
                </div>
                <div className="field">
                  <label>PP:</label>
                  <input type="text" name="perception"/>
                </div>
                <div className="field">
                  <label>Speed</label>
                  <input type="text" name="speed"/>
                </div>
                {this.props.user 
                  ?
                    <div className="field">
                      <label>Group Name</label>
                      <input type="text" name="group"/>
                    </div>
                  : null

                }
                {this.props.user 
                  ?
                    <span><button className="ui button" type="submit">Save and Submit</button></span>
                  :
                    <span><button className="ui button" type="submit">Submit</button></span>
                }
              </form>
            </Modal.Content>
          </Modal>
        </div>
        <OrderList />
        <PlayersList />
        <MonstersList />
        <div className="buttonsWrapper">
          {/* <OrderButton /> */}
          <ClearMonsters />
          <ClearPlayers />
        </div>
      </div>
      </Wrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    players: state.players,
    monsters: state.monsters,
    players: state.players,
    currentTab: state.currentTab,
    selectedMonster: state.selectedMonster,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({clearSelectedMonster}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Arena);
