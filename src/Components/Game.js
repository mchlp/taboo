import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Game.css';
import backend from '../backend';

//assets 
import CheckMark from '../Assets/Icons/checkmark.png';
import Arrow from '../Assets/Icons/arrow.png';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            restricted: [],
            roundEndTime: null,
            timeLeft: 0

        };
        this.handleScore = this.handleScore.bind(this);
        this.handleFail = this.handleFail.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const wordData = backend.getWord();
        this.setState({
            word: wordData[0],
            restricted: wordData.slice(1)
        });
    }
    handleScore() {
        const wonGame = backend.score();
        if (wonGame) {
            clearInterval(this.state.updateInterval);
            this.props.history.push('/score');
        }
        this.handleClick();
    }

    handleFail() {
        backend.failWord();
        this.handleClick();
    }

    componentDidMount() {

        console.log(backend.getTeamNames());

        if (backend.getNumPlayers() === 0) {
            this.props.history.push('/teams');
        }
        const wordData = backend.getWord();
        const endTime = backend.startRound();

        this.setState({
            word: wordData[0],
            restricted: wordData.slice(1),
            roundEndTime: endTime
        }, () => {
            const updateInterval = setInterval(() => {
                const timeLeft = Math.ceil((this.state.roundEndTime - Date.now()) / 1000);
                this.setState({
                    timeLeft,
                    updateInterval
                });

                if (timeLeft <= 0) {
                    clearInterval(updateInterval);
                    backend.endRound();
                    this.props.history.push('/ready');
                }
            }, 250);
        });
    }

    render() {
        const restWords = [];

        //adds li components of words into "restWords"
        for (let w of this.state.restricted)
            restWords.push(<li key={w}>{w}</li>);

        return (
            <body>
                <Container className="wrapper">
                  
                        <h1 id="time-left">{this.state.timeLeft}</h1>
                   
                  
                        <Button id='end-game-button' className='turquoise-button' onClick={() => { this.props.history.push('/score'); }}>End game</Button>
                    
                   
                        <h2 id='team-text'>It is team {backend.getTeamNames()[backend.getCurrentTeam()]}'s turn</h2>
                

                    <Container className="card">
                        <Row>
                            <Col>
                                <h1>{this.state.word}</h1>
                                <div className="restricted">{restWords}</div>
                            </Col>
                        </Row>
                    </Container>
                    <Row className="round-buttons">
                        <Col>
                            <Button id='fail-button' className="round float-right" onClick={this.handleFail}><img src={Arrow} /></Button>
                        </Col>
                        <Col>
                            <Button id='success-button' className="round float-left" onClick={this.handleScore}><img src={CheckMark} /></Button>
                        </Col>
                    </Row>
                </Container>
            </body >
        );
    }
}

export default Game;