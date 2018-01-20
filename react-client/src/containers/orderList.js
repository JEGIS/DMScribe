import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { populateMonsterUrls } from '../actions/index.js';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: null
    };
    this.pushLeft = this.pushLeft.bind(this);
    this.pushRight = this.pushRight.bind(this);
  }

  handleClick(event, i) {
    this.setState({ selected: i });
  }

  pushLeft() {
    if (this.state.selected) {
      var i = this.state.selected;
      var temp = this.props.turnOrder[i-1];
      this.props.turnOrder[i-1] = this.props.turnOrder[i];
      this.props.turnOrder[i] = temp;
    }
  }

  pushRight() {

  }
 
  render () {
    if (this.props.turnOrder.length === 0) {
      return null;
    }

    return(
      <div>
        <Card.Group>
          {this.props.turnOrder.map((card, index) => {
                  return (
                      <Card key={index} className='turnCards' onClick={(e) => {this.handleClick(e, index)}} >
                        <Card.Content>
                          <Card.Header>
                            {card.name} 
                          </Card.Header>
                          <Card.Meta>
                            <span className='date'>
                            </span>
                          </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                          Turn order {index + 1}
                        </Card.Content>
                      </Card>
                    )
                })}
        <Button content="Move Player Left" />
        <Button content="Move Player Right" />
        </Card.Group>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    turnOrder: state.turnOrder,
    myaction: populateMonsterUrls
  }
}

export default connect(mapStateToProps)(OrderList);




