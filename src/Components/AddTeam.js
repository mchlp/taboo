import React, { Component } from 'react';
import { Button, Form, Row, Container, Col } from 'react-bootstrap';
import './Container.css';
import './AddTeam.css';
import backend from '../backend';

//AddTeam constants 
const teamNames = []; //stores submitted names
const teamNamesRendered = []; //rendered name button components


//settings constants
//default settings
const defaultTime = 45;
const defaultPenalty = 0;
const defaultCapPoints = 25;

const settings = { time: defaultTime, penalty: defaultPenalty, capPoints: defaultCapPoints };

class AddTeamButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '', //temporarily stores the onChange value 
            name: '', //value of last team name that was submitted
            showNoName: false,
            showNameTaken: false

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteTeam = this.handleDeleteTeam.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        //data validation
        if (this.state.value === '') {
            this.setState({ showNoName: true, showNameTaken: false });
        }
        else if (teamNames.includes(this.state.value)) {
            this.setState({ showNameTaken: true, showNoName: false });
        }
        else {
            this.setState({
                showNoName: false,
                showNameTaken: false,
                name: this.state.value,
                value: ''
            });

        }

        //clearing the input form
        document.getElementById('input').value = '';
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ value: event.target.value });
    }

    handleDeleteTeam(event) {
        console.log(event);
    }

    render() {
        if (!teamNames.includes(this.state.name) && !(this.state.name === '')) {
            teamNamesRendered.push(
                <Row className='holder justiy-content-md-center'
                    onClick={this.handleDeleteTeam} key={this.state.name}>
                    <h4 className='scoreboard-text'>
                        {this.state.name}
                    </h4>
                </Row>
            );
            teamNames.push(this.state.name);
        }


        return (
            <Container>
                <div>
                    {teamNamesRendered}
                </div>
                <Form onSubmit={this.handleSubmit} noValidate>
                    <Row className='holder'>
                        <Col xs={8} sm={8}>
                            <Form.Control onChange={this.handleChange}
                                type="text"
                                name="name"
                                noValidate
                                id="input"
                                placeholder="Team Name">
                            </Form.Control>
                        </Col>
                        <Col xs={4} sm={4}>
                            <Button className='turquoise-button' type="submit" onClick={this.handleSubmit}>Add Team</Button>
                        </Col>
                    </Row>
                </Form>
                {this.state.showNoName ? <p className="error" >Please enter a name</p> : null}
                {this.state.showNameTaken ? <p className="error">Name is taken. Please enter a different name.</p> : null}
                {this.props.teamsInvalid ? <p className="error">Please add more teams.</p> : null}
            </Container>

        );
    }
}



class AddTeam extends Component {

    constructor(props) {
        super(props);

        this.state = {

            time: defaultTime,
            penalty: defaultPenalty,
            capPoints: defaultCapPoints,

            timeInvalid: false,
            penaltyInvalid: false,
            capPointsInvalid: false,
            teamsInvalid: false,

            goToGame: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        const { name, value } = event.target;

        switch (name) {
            case ('time'):
                this.setState({ time: value });
                break;
            case ('penalty'):
                this.setState({ penalty: value });
                break;
            case ('capPoints'):
                this.setState({ capPoints: value });
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {

        event.preventDefault();

        let timeInvalid, penaltyInvalid, capPointsInvalid, teamsInvalid;

        if (this.state.time < 5) timeInvalid = true;
        else timeInvalid = false;

        if (this.state.penalty < 0) penaltyInvalid = true;
        else penaltyInvalid = false;

        if (this.state.capPoints < 1) capPointsInvalid = true;
        else capPointsInvalid = false;

        if (teamNames.length < 1) teamsInvalid = true;
        else teamsInvalid = false;

        if (!timeInvalid && !penaltyInvalid
            && !capPointsInvalid && !teamsInvalid) {
            settings.time = this.state.time;
            settings.penalty = this.state.penalty;
            settings.capPoints = this.state.capPoints;

            backend.startGame(settings.time, settings.penalty, settings.capPoints, teamNames.length);
            backend.setupTeams(teamNames);

            this.props.history.push('/ready');
        }

        this.setState({
            timeInvalid,
            penaltyInvalid,
            capPointsInvalid,
            teamsInvalid
        });

    }
    render() {
        return (
            <Container className="wrapper">

                <h1 className="title" id="settings-title">Settings</h1>

                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col xs={5} sm={5}>
                            <h4 className="settings-subtitle">Time per Round</h4>
                        </Col>
                        <Col xs={3} sm={3}>
                            <Form.Control className="number-input"
                                onChange={this.handleChange}
                                type="number"
                                name="time"
                                id="time"
                                defaultValue={defaultTime}
                                noValidate>
                            </Form.Control>
                        </Col>
                        <Col xs={4} sm={4}>
                            <h4 className="unit">Seconds</h4>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.timeInvalid ? <p className="error">Time is too short. Please enter a new time.</p> : null}
                    </Row>

                    <Row>
                        <Col xs={5} sm={5}>
                            <h4 className="settings-subtitle">Fail Penalty</h4>
                        </Col>
                        <Col xs={3} sm={3}>
                            <Form.Control className="number-input"
                                onChange={this.handleChange}
                                type="number"
                                name="penalty"
                                id="penalty"
                                defaultValue={defaultPenalty}
                                noValidate>
                            </Form.Control>
                        </Col>
                        <Col xs={4} sm={4}>
                            <h4 className="unit">Points</h4>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={5} sm={5}>
                            <h4 className="settings-subtitle">Cap points</h4>
                        </Col>
                        <Col xs={3} sm={3}>
                            <Form.Control className="number-input"
                                onChange={this.handleChange}
                                type="number"
                                name="capPoints"
                                id="capPoints"
                                defaultValue={defaultCapPoints}
                                noValidate>
                            </Form.Control>
                        </Col>
                        <Col xs={4} sm={4}>
                            <h4 className="unit">Points</h4>
                        </Col>
                    </Row>


                    <Container id='addteam-container'>
                        <h1 className="title" id="team-title">Teams!</h1>
                        <AddTeamButton teamsInvalid={this.state.teamsInvalid}/>
                    </Container>

                    <Button className='turquoise-button' id='submit-button' type="submit">
                        Start Game
                    </Button>

                </form>
            </Container>
        );
    }
}

export default AddTeam;
