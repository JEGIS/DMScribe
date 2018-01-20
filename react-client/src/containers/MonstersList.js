import React, { Component } from 'react';
import { Card, Icon, Image, Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeMonster, generateTurnOrder, assignMonTurnValue, selectMonster, selectTab, clearOrderField } from '../actions/index';


class MonstersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsterExtraModal: false,
    };

    this.openMonsterExtra = this.openMonsterExtra.bind(this);
    this.closeMonsterExtra = this.closeMonsterExtra.bind(this);
  }

  handleOnBlur(e) {
    assignMonTurnValue(e.target.id, e.target.value);
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      assignMonTurnValue(e.target.id, e.target.value);
    }
  }

  openMonsterExtra () {
    this.setState({monsterExtraModal: true});
  }

  closeMonsterExtra () {
    this.setState({monsterExtraModal: false});
  }

  render () {
    //if the redux store monster array is zero this will return null and nothing will appear on the page.
    if (this.props.monsters.length === 0) {
      return null;
    }

    //this returns the list containing all the Monster
    //cards on the field
  	return(
      <div>
        <Card.Group>
          {/*This function maps over the monsters array
          in the redux store and formats their information
          into the display cards*/}
      		{this.props.monsters.map((monster, index) => {
                  return (
                      <Card key={index} className='cards'>
                        <div className='monsterImgContainer'>
                          <Image className='monsterImg' src={monster.image}/>
                        </div>
                        <Card.Content>
                          <Card.Header>
                            {monster.name} 
                          </Card.Header>
                          <Card.Meta>
                            <span className='date'>
                            </span>
                          </Card.Meta>
                          <Card.Description>
                              <p className='stats'>
                                <span className='stat'>AC: {monster.armor_class}</span>
                                <span className='stat'>HP: <input
                                          className='hpInput'
                                          type='number'
                                          placeholder={monster.hit_points}
                                        /></span>
                                <span className='stat'>INIT MOD: {monster.init}</span>
                              </p>
                              <p className='stats'>
                                <span className='stat'>STR: {monster.strength}</span>
                                <span className='stat'>DEX: {monster.dexterity}</span>
                                <span className='stat'>CON: {monster.constitution}</span>
                              </p>
                              <p className='stats'>
                                <span className='stat'>WIS: {monster.wisdom}</span>
                                <span className='stat'>CHA: {monster.charisma}</span>
                                <span className='stat'> INIT:  
                                  {monster.order
                                    ?  <span className='monsterOrderStat'>
                                      {monster.order}
                                      </span>
                                    : monster.order === 0 
                                      ? monster.order
                                      :
                                        <input
                                          id={monster.id}
                                          className='initInput'
                                          type='number'
                                          placeholder='?'
                                          onBlur={this.handleOnBlur}
                                          onKeyUp={this.handleKeyUp}
                                        />
                                  }
                                </span>
                              </p>
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <Modal size='mini'
                            trigger=
                            {
                              <a>
                                <Icon 
                                name='address card outline' />
                                Monster Info
                              </a>
                            }
                            closeIcon
                          >
                            <Modal.Content image>
                              <Card className='cards'>
                                <div className='monsterImgContainer'>
                                  <Image className='monsterImg' src={monster.image}/>
                                </div>
                                <Card.Content>
                                  <Card.Header>
                                    {monster.name} 
                                  </Card.Header>
                                  <Card.Meta>
                                    <div className='date'>
                                      {`Alignment: ${monster.alignment}`}
                                    </div>
                                    <div>
                                      {`Languages: ${monster.languages}`}
                                    </div>
                                  </Card.Meta>
                                  <Card.Description>
                                      {monster.actions 
                                        ?
                                          <div className='actionsDiv'> <strong>Actions: </strong><br/>
                                            {monster.actions.map((action) => {
                                              return <div className='actionSkill' key={action.name}>
                                                        <p><strong>Name: </strong>{action.name}</p> 
                                                        {action.attack_bonus ? <p><strong>Attack bonus: </strong>{action.attack_bonus}</p> : null}
                                                        {action.damage_bonus ? <p><strong>Damage bonus: </strong>{action.damage_bonus}</p> : null}
                                                        {action.damage_dice ? <p><strong>Damage dice: </strong>{action.damage_dice}</p> : null}
                                                        <p> <strong>Description: </strong>{action.desc}</p>
                                                     </div>
                                            })}
                                          </div>
                                        : null
                                      }
                                      <p className='selectedStats'>
                                        <span className='selectedStat'><strong>AC:</strong> {monster.armor_class}</span>
                                        <span className='selectedStat'><strong>HP:</strong> {monster.hit_points}</span>
                                        <span className='selectedStat'><strong>INIT:</strong> {monster.init}</span>
                                        <span className='selectedStat'><strong>STR:</strong> {monster.strength}</span>
                                      </p>
                                      <p className='selectedStats'>
                                        <span className='selectedStat'><strong>DEX:</strong> {monster.dexterity}</span>
                                        <span className='selectedStat'><strong>CON:</strong> {monster.constitution}</span>
                                        <span className='selectedStat'><strong>WIS:</strong> {monster.wisdom}</span>
                                        <span className='selectedStat'><strong>CHA:</strong> {monster.charisma}</span>
                                      </p>
                                      <p className='selectedStats'>
                                      </p>
                                  </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                  <span><strong>Senses: </strong>{monster.senses}</span>
                                </Card.Content>
                              </Card>
                            </Modal.Content>
                          </Modal>
                          {/*This icon is the red X in the corner and triggers the redux Action that
                          remove the monster from the redux monsters array. It also triggers the redux
                          Action that regenerates the turn order based on the new redux monster array*/}
                          <Icon
                          onClick={() => {
                            if (this.props.monsters.length === 1) {
                              clearOrderField();
                              this.props.removeMonster(monster.id);
                            } else {
                              this.props.removeMonster(monster.id);
                              this.props.generateTurnOrder();                              
                            }
                          }} 
                          className='deleteMonsterIcon' 
                          color='red' 
                          name='remove'/>
                        </Card.Content>
                      </Card>
                    )
                })}
        </Card.Group>
      </div>
  	);
  }
}

//This maps the specified redux Store object property onto the props object for use in this container
function mapStateToProps (state) {
  return {
    monsters: state.monsters
  }
}

//This maps the specified redux Action onto the props objects for use in this container
function mapDispatchToProps (dispatch) {
  return bindActionCreators({ removeMonster, generateTurnOrder, selectMonster, selectTab }, dispatch);
}

//This exports and converts this component as a container that is connected to both react and redux
export default connect(mapStateToProps, mapDispatchToProps)(MonstersList);




