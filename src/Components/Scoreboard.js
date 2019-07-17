import React, { Component } from 'react';
import backend from '../backend';
import { withRouter } from 'react-router-dom';

class Scoreboard extends Component {
    render() {

        if (backend.getNumPlayers() === 0) {
            this.props.history.push('/teams');
        }

        const capPoints = backend.getCapPoints();
        let winningTeam = '';
        let winningScore = 0;
        let teamWon = false;

        const teamData = [];
        console.log(backend.getNumPlayers());
        for (let i = 0; i < backend.getNumPlayers(); i++) {
            if (backend.getScores()[i] >= winningScore) {
                winningTeam = backend.getTeamNames()[i];
                winningScore = backend.getScores()[i];
                if (winningScore >= capPoints) {
                    teamWon = true;
                }
            }
            teamData.push(
                <div key={i}>
                    <p>{backend.getTeamNames()[i]}</p>
                    <p>Score: {backend.getScores()[i]}</p>
                </div>
            );
        }

        console.log(teamData);

        return (
            <div>
                <h1 style={{ color: 'black' }}>Scoreboard!</h1>
                <p>Cap Points: {capPoints}</p>
                <h2>{teamWon ? winningTeam + ' won!' : null}</h2>
                {teamData}
            </div>
        );
    }
}

export default withRouter(Scoreboard);
