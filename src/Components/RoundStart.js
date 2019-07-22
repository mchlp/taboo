import React, { Component } from 'react';
import Scoreboard from './Scoreboard';
import backend from '../backend';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './Scoreboard.css';

export default class RoundStart extends Component {
    render() {
        if (backend.getNumPlayers() === 0) {
            this.props.history.push('/teams');
        }

        const teamTurn = backend.getTeamNames()[backend.getCurrentTeam()];

        return (
            <Container id="scoreboard-container">
                <h4 id="start-round-title">Ready to start round?</h4>
                <h2 id="team-turn-text">It's {teamTurn}'s turn!</h2>
                <Scoreboard />
                <Link to='/play'><Button className="turquoise-button" id="ready-button">Ready</Button></Link>
            </Container>
        );
    }
}