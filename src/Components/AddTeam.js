import React, {Component} from 'react';
import { Button, Form, Row, Container, FormGroup, Col} from 'react-bootstrap';
import './Container.css';
import './AddTeam.css';
import { thisTypeAnnotation } from '@babel/types';
import backend from '../backend'; 
import { Link } from 'react-router-dom';

//AddTeam constants 
const teamNames = []; //stores submitted names
const teamNamesRendered = []; //rendered name button components


//settings constants
//default settings
const defaultTime = 45;
const defaultPenalty = 0;
const defaultCapPoints = 1000; 

const settings = { time: defaultTime, penalty: defaultPenalty, capPoints: defaultCapPoints };

class AddTeamButton extends Component{
    constructor(props){
        super(props);

        this.state ={
            value: '', //temporarily stores the onChange value 
            name: '', //value of last team name that was submitted
            showNoName: false,
            showNameTaken: false

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        //data validation
        if(this.state.value === ''){
            this.setState({ showNoName : true});
        }
        else if(teamNames.includes(this.state.value)){
            this.setState({ showNameTaken : true});
        }
        else{
            this.setState({ showNoName: false, 
                showNameTaken: false,
                name: this.state.value
            });
            
        }

        //clearing the input form
        document.getElementById('input').value = '';
    }

    handleChange(event){
        event.preventDefault();
        this.setState({value: event.target.value});
    }

    render(){
        if(!teamNames.includes(this.state.name) && !(this.state.name === '')){
            teamNamesRendered.push(
                <Row>
                    <Button>
                        {this.state.name}
                    </Button>
                </Row> 
            );
            teamNames.push(this.state.name);
        }
        
        
        return(
            <Container>
                <div>
                    {teamNamesRendered}
                </div>
                <form onSubmit={this.handleSubmit} noValidate>
                    <Row>
                        <Col>
                            <input onChange={this.handleChange}
                                type="text"
                                name="name"
                                noValidate
                                id="input"
                                placeholder="Team Name">
                            </input>
                        </Col>
                        <Col>
                            <Button type="submit" onClick={this.handleSubmit}>Add Team</Button>
                        </Col>
                    </Row>
                </form>
                {this.state.showNoName ? <p className="error" >Please enter a name</p> : null }
                {this.state.showNameTaken ? <p className="error">Name is taken. Please enter a different name.</p> : null}
                { this.state.teamsInvalid ? <p className="error">Please add more teams.</p> : null }
            </Container>
            
        );
    } 
}



class AddTeam extends Component{

    constructor(props){
        super(props);

        this.state = {
            
            time: defaultTime,
            penalty: defaultPenalty,
            capPoints: defaultCapPoints,

            timeInvalid: false,
            penaltyInvalid: false,
            capPointsInvalid: false,

            teamsInvalid: true,

            goToGame: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        event.preventDefault();

        const {name, value} = event.target;

        switch(name){
        case('time'):
            this.setState({ time: value });
            break;
       
        case('penalty'):
            this.setState({penalty: value});
            break;
        case('capPoints'):
            this.setState({capPoints: value});
            break;
        }
        console.log(`time ${this.state.time}`);
    }

    handleSubmit(event){
        
        event.preventDefault();
        console.log('handling submit');
        
        if(this.state.time < 5) this.setState({timeInvalid: true});
        else this.setState( {timeInvalid: false});
        
        if(this.state.penalty < 0) this.setState( {penaltyInvalid: true} );
        else this.setState( {penaltyInvalid: false});

        if(this.state.capPoints < 1) this.setState({capPointsInvalid : true});
        else this.setState( {capPointsInvalid: false});

        if(teamNames.length < 2) this.setState({ teamsInvalid: true });
        else this.setState( { teamsInvalid: false});

        if(!this.state.timeInvalid && !this.state.penaltyInvalid 
            && !this.state.capPointsInvalid && !this.state.teamsInvalid){
            settings.time = this.state.time;
            settings.penalty = this.state.penalty;
            settings.capPoints = this.state.capPoints;

            backend.startGame(settings.time, settings.penalty, settings.capPoints);
            backend.setupTeams(teamNames);

            this.props.history.push('/play');   
        }
    }
    render(){
        return(
            <body>
                
                <Container>
                    <h1 className="title" id="team-title">Teams!</h1>
                    <AddTeamButton/>
                    
                    <h1 className="title" id="settings-title">Settings</h1>

                    <form>

                        <Row>
                            <Col>
                                <h4 className="settings-subtitle">Time per Round</h4>
                            </Col>
                            <Col>
                                <input className="number-input"
                                    onChange={this.handleChange}
                                    type="number"
                                    name="time"
                                    id="time"
                                    defaultValue={defaultTime}
                                    noValidate>
                                </input>
                            </Col>
                            <Col>
                                <h4 className="unit">Seconds</h4>
                            </Col>
                        </Row>
                        <Row>
                            { this.state.timeInvalid? <p className="error">Time is too short. Please enter a new time.</p> : null }
                        </Row>

                        <Row>
                            <Col>
                                <h4 className="settings-subtitle">Fail Penalty</h4>
                            </Col>
                            <Col>
                                <input className="number-input"
                                    onChange={this.handleChange}
                                    type="number"
                                    name="penalty"
                                    id="penalty"
                                    defaultValue={defaultPenalty}
                                    noValidate>
                                </input>
                            </Col>
                            <Col>
                                <h4 className="unit">Points</h4>
                            </Col>
                        </Row> 

                        <Row>
                            <Col>
                                <h4 className="settings-subtitle">Cap points</h4>
                            </Col>
                            <Col>
                                <input className="number-input"
                                    onChange={this.handleChange}
                                    type="number"
                                    name="capPoints"
                                    id="capPoints"
                                    defaultValue={defaultCapPoints}
                                    noValidate>
                                </input>
                            </Col>
                            <Col>
                                <h4 className="unit">Points</h4>
                            </Col>
                        </Row>                    
                        <Button type="submit" onClick={this.handleSubmit}>
                            
                                Start Game
                        
                        </Button>
                       
                    </form>
                    
                </Container>
            </body>
        );
    }
}

export default AddTeam;
