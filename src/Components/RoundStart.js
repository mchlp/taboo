import React, { Component } from 'react';
import Scoreboard from './Scoreboard';
import backend from '../backend';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './Scoreboard.css';

let header;

export default class RoundStart extends Component {
    constructor(props){
        super(props);
        this.state = { showTop: true };
    }
    componentDidMount(){
        console.log('roundstart was mounted');
        if(backend.state.teamWon)
        {   console.log('they won!');
            this.setState({showTop: false});
        }
        else this.setState({showTop: true});
    }
    componentWillUnmount(){
        console.log('unmounted');
    }
    render() {
        
        if (backend.getNumPlayers() === 0) {
            this.props.history.push('/teams');
        }

        const teamTurn = backend.getTeamNames()[backend.getCurrentTeam()];
        return (
            <Container id="scoreboard-container">
                <h4 id="start-round-title"> { !this.state.showTop ? null : 'Ready to start round?' }</h4>
                <h2 id="team-turn-text">{ !this.state.showTop ? null : 'It\'s ' + teamTurn + '\'s turn!' }</h2>

                <Scoreboard />
                
                { !this.state.showTop ? 
                    <Link to='/'>
                        <Button className="turquoise-button" id="ready-button">Main Menu</Button>
                    </Link>:
                    
                    <Link to='/play'>
                        <Button className="turquoise-button" id="ready-button">Ready</Button>
                    </Link>}
            </Container>
        );
    }
}
