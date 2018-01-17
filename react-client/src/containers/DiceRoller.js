import React, { Component } from 'react';
import {Grid, Card, Button} from 'semantic-ui-react';

class DiceRoller extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    roll: ''
	  };
	  this.handleClick = this.handleClick.bind(this);
	  this.roll = this.roll.bind(this);
	}

	roll(number) {
		return  Math.floor((Math.random() * number) + 1);
	}

	handleClick(dice){
		let number = this.roll(dice);
		this.setState({'roll': number});
	}

	render() {
		return (
			<div className = 'dice'>
   			<Button.Group size = 'large'>
   				<Button onClick={() => this.handleClick(4)} color = 'red'>
   					{this.state.d4}
   					Roll D4
   				</Button>
   				<Button onClick={() => this.handleClick(6)} color = 'orange'>
   					{this.state.d6}
   					Roll D6
   				</Button>
   				<Button onClick={() => this.handleClick(8)} color = 'yellow'>
   					{this.state.d8}
   					Roll D8
   				</Button>
   				<Button onClick={() => this.handleClick(10)} color = 'green'>
   					{this.state.d10}
   					Roll D10
   				</Button>
   				<Button onClick={() => this.handleClick(12)} color = 'blue'>
   					{this.state.d12}
   					Roll D12
   				</Button>
   				<Button onClick={() => this.handleClick(20)} color = 'purple'>
   					{this.state.d20}
   					Roll D20
   				</Button>
   				<Button onClick={() => this.handleClick(100)} color = 'teal'>
   					{this.state.d100}
   					Roll D100
   				</Button>
   			</Button.Group>
   			<div>
 					{this.state.roll}
   			</div>
      </div>
		)
	}
}

export default DiceRoller;