import React, { Component } from 'react';
import backend from '../backend';
import { withRouter } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import './Container.css';
import './Scoreboard.css';


class Scoreboard extends Component {
    render() {

        if (backend.getNumPlayers() === 0) {
            this.props.history.push('/teams');
        }

        const capPoints = backend.getCapPoints();
        let winningTeam = ''; 
        let winningScore = 0;
        const teamData = [];
        for (let i = 0; i < backend.getNumPlayers(); i++) {
            if (backend.getScores()[i] >= winningScore) {
                winningTeam = backend.getTeamNames()[i];
                winningScore = backend.getScores()[i];
                if (winningScore >= capPoints) {
                    backend.state.teamWon = true;
                }
            }
            teamData.push(
                <Row key={ i } className="holder">
                    <Col><h4 className="scoreboard-text" id="rank-text">{ i + 1 }</h4></Col>
                    <Col xs={6}>
                        <h4 className="scoreboard-text">{backend.getTeamNames()[i]}</h4>
                    </Col>
                    <Col>
                        <h4 className="scoreboard-text">{backend.getScores()[i]}</h4>
                    </Col>
                </Row>
            );
        }

        return (
            <Container className="wrapper">
                <h1 id="scoreboard-title">Scoreboard</h1>
                <p id="cap-points-text">Cap Points: {capPoints}</p>
                <h2 id="winning-text">{backend.state.teamWon ? winningTeam + ' won!' : null}</h2>

                <Row id="column-header-text">
                    <Col> </Col>
                    <Col>
                        <h3>Team</h3>
                    </Col>
                    <Col>
                        <h3>Score</h3>
                    </Col>
                </Row>
                {teamData}
            </Container>
        );
    }
}

export default withRouter(Scoreboard);