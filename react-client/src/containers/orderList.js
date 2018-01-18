import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

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
                      <Card key={index} className='turnCards' onClick={this.handleClick}>
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
    turnOrder: state.turnOrder
  }
}

export default connect(mapStateToProps)(OrderList);




