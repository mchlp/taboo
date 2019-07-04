import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: 'Test',
            word: 'Test',
            restricted: []
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Button>Scoreboard</Button>
                        </Col>
                        <Col>
                            <Button>End game</Button>
                        </Col>
                    </Row>
                    <Row>
                        <h2> this is some text</h2>
                    </Row>

                    <Container className="card">
                        <Row><h1>{this.state.word}</h1></Row>
                    </Container>
                </Container>


            </div>
        );
    }
}

export default Game;