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
            restricted: []

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
        backend.score();
        this.handleClick();
    }

    handleFail() {
        backend.failWord();
        this.handleClick();
    }

    componentDidMount() {
        if (backend.getTeamNames().length == 0) {
            this.props.history.push('/teams');
        }
        const wordData = backend.getWord();
        this.setState({
            word: wordData[0],
            restricted: wordData.slice(1)
        });

    }

    render() {
        console.log(backend.getTeamNames[backend.getCurrentTeam]);
        const restWords = [];

        //adds li components of words into "restWords"
        for (let w of this.state.restricted)
            restWords.push(<li>{w}</li>);

        return (
            <body>
                <Container className="wrapper">
                    <Row>
                        <h1>time</h1> {/*"add time"*/}
                    </Row>
                    <Row>
                        <Button id='end-game-button'><Link to="/score">End game</Link></Button>
                    </Row>
                    <Row>
                        <h2>It is team {backend.getTeamNames()[backend.getCurrentTeam()]}'s turn</h2>
                    </Row>

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
                            <Button variant='warning' className="round float-right" onClick={this.handleFail}><img src={Arrow} /></Button>
                        </Col>
                        <Col>
                            <Button variant='success' className="round float-left" onClick={this.handleScore}><img src={CheckMark} /></Button>
                        </Col>
                    </Row>
                </Container>
            </body>
        );
    }
}

export default Game;