import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Game.css';

class Game extends Component{
    constructor(props){
        super(props); 
    }

    render() {
        const restWords = [];

        //adds li components of words into "restWords"
        for (let w of this.props.restricted)
            restWords.push(<li>{w}</li>);

        return (
            <body>
                <Container className="wrapper">
                    <Row>
                        <Col>
                            <Button >Scoreboard</Button>
                        </Col>
                        <Col>
                            <Button>End game</Button>
                        </Col>
                    </Row>
                    <Row>
                        <h2>It is team {this.props.teamName}'s turn</h2>
                    </Row>

                    <Container className="card">
                        <Row>
                            <Col>
                                <h1>{this.props.word}</h1>
                                <div>{restWords}</div>
                            </Col>
                        </Row>
                    </Container>
                    <Row>
                        <Col>
                            <Button>Skip!</Button>
                        </Col>
                        <Col>
                            <Button>Score!</Button>
                        </Col>
                    </Row>
                </Container>
            </body>
        );
    }
}

export default Game;