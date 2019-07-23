import React, { Component } from 'react';
import Scoreboard from './Scoreboard';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ScoreboardPage.css';

export default class ScoreboardPage extends Component {
    render() {
        return (
            <div>
                <Container id='scoreboardPage'>
                    <Scoreboard />
                    <Link to="/">
                        <Button className='turquoise-button' id='playagain-button'>
                            Play Again
                        </Button>
                    </Link>
                </Container>
            </div>
        );
    }
}
