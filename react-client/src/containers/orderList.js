import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { playerDefersTurn } from '../actions/index.js';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.selected = null;
    this.pushLeft = this.pushLeft.bind(this);
    this.pushRight = this.pushRight.bind(this);
  }

  handleClick(event, i) {
    this.selected = i;
  }

  pushLeft() {
    if (this.selected !== null) {
      var copy = this.props.turnOrder.slice();
      var i = this.selected;
      var j = ((i - 1) + copy.length) % copy.length;
      var temp = copy[j];
      copy[j] = copy[i];
      copy[i] = temp;
      this.selected = j;
      playerDefersTurn(copy);
    }
  }

  pushRight() {
    if (this.selected !== null) {
      var copy = this.props.turnOrder.slice();
      var i = this.selected;
      var j = (i + 1) % copy.length;
      var temp = copy[j];
      copy[j] = copy[i];
      copy[i] = temp;
      this.selected = j;
      playerDefersTurn(copy);
    }
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
        </Card.Group>
        <div className="buttonsWrapper">
        <Button className= "theme-button" content="Move Player Left" onClick={this.pushLeft} />
        <Button className= "theme-button" content="Move Player Right" onClick={this.pushRight} />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    turnOrder: state.turnOrder,
  }
}

export default connect(mapStateToProps)(OrderList);




