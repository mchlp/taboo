import React, { Component } from 'react';
import Scoreboard from './Scoreboard';
import backend from '../backend';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class RoundStart extends Component {
    render() {
        if (backend.getNumPlayers() === 0) {
            this.props.history.push('/teams');
        }

        const teamTurn = backend.getTeamNames()[backend.getCurrentTeam()];

        return (
            <div>
                <h1>Ready to start round?</h1>
                <h2>It's {teamTurn}'s turn!</h2>
                <Scoreboard />
                <Link to='/play'><Button>Ready</Button></Link>
            </div>
        );
    }
}
