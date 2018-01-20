import React, { Component } from 'react';
import {Grid, Card, Button, Image} from 'semantic-ui-react';
import { CSSTransitionGroup } from 'react-transition-group'

class DiceRoller extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	items: [],
	    roll: []
	  };
	  this.handleClick = this.handleClick.bind(this);
	}

	handleClick(dice){
    if(this.state.items.length < 5){
  		let roll = [Math.floor((Math.random() * dice) + 1), dice];
  		const newItems = this.state.items.concat([roll]);
  		this.setState({'items': newItems});
    }
	}

	handleRemove(i) {
	  let newItems = this.state.items.slice();
	  newItems.splice(i, 1);
	  this.setState({items: newItems});
	}

	render() {
		const items = this.state.items.map((item, i) => {
			let image = './images/d12.png'
			if(item[1] === 4 || item[1] === 8){
				image = './images/d4.png'
			}
			if(item[1] === 20){
				image = './images/d20.png'
			}
			if(item[1] === 6){
				image = './images/d6.png'
			}
			if(item[1] === 10){
				image = './images/d10.png'
			}

			return (
	    	<div className='roll'>
	      	<img src={image} key={i} onClick={() => this.handleRemove(i)}/>
	      	<div className='numberRoll'>{item[0]}</div>
	      </div>
	   	)
		});

		return (
			<div className = 'diceRoller theme-text"'>
   			<Button.Group className="theme-text" size = 'large'>
   				<Button className="theme-text" onClick={() => this.handleClick(4)} color = 'red'>
   					{this.state.d4}
   					Roll D4
   				</Button>
   				<Button className="theme-text" onClick={() => this.handleClick(6)} color = 'orange'>
   					{this.state.d6}
   					Roll D6
   				</Button>
   				<Button className="theme-text" onClick={() => this.handleClick(8)} color = 'yellow'>
   					{this.state.d8}
   					Roll D8
   				</Button>
   				<Button className="theme-text" onClick={() => this.handleClick(10)} color = 'green'>
   					{this.state.d10}
   					Roll D10
   				</Button>
   				<Button className="theme-text" onClick={() => this.handleClick(12)} color = 'blue'>
   					{this.state.d12}
   					Roll D12
   				</Button>
   				<Button className="theme-text" onClick={() => this.handleClick(20)} color = 'purple'>
   					{this.state.d20}
   					Roll D20
   				</Button>
   				<Button className="theme-text" onClick={() => this.handleClick(100)} color = 'teal'>
   					{this.state.d100}
   					Roll D100
   				</Button>
   			</Button.Group>
   			<div className = 'dice'>
   				<CSSTransitionGroup
	          transitionName="example"
	          transitionEnterTimeout={700}
	          transitionLeaveTimeout={300}>
	          {items}
   				</CSSTransitionGroup>
   			</div>
      </div>
		)
	}
}

export default DiceRoller;