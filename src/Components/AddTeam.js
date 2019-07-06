import React, {Component} from 'react';
import { Button, Form, Row, Container, FormGroup, Col} from 'react-bootstrap';
import './Container.css';
import './AddTeam.css';
import { thisTypeAnnotation } from '@babel/types';


const rendered = []; //stores submitted names
const teamNamesRendered = []; //rendered name button components

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
        else if(rendered.includes(this.state.value)){
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
        if(!rendered.includes(this.state.name) && !(this.state.name === '')){
            teamNamesRendered.push(
                <Row>
                    <Button>
                        {this.state.name}
                    </Button>
                </Row> 
            );
            rendered.push(this.state.name);
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
                {this.state.showNoName ? <p className="name-error" >Please enter a name</p> : null }
                {this.state.showNameTaken ? <p className="name-error">Name is taken. Please enter a different name.</p> : null}
            </Container>
            
        );
    } 
}

//default settings
const defaultTime = 45;
const defaultPenalty = 0;
const defaultCapPoints = 1000; 

class AddTeam extends Component{

    constructor(props){
        super(props);

        this.state = {
            
            time: defaultTime,
            penalty: defaultPenalty,
            capPoints: defaultCapPoints     
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
        
        
    }
    render(){
        return(
            <body>
                <form>
                    <Container>
                        <h1 className="title" id="team-title">Teams!</h1>
                        <AddTeamButton/>
                        <h1 className="title" id="settings-title">Settings</h1>








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
                                <h4 className="unit">seconds</h4>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <h4 className="settings-subtitle">Fail Penalty</h4>
                            </Col>
                        </Row> 

                        <Row>
                            <Col>
                                <h4 className="settings-subtitle">Cap points</h4>
                            </Col>
                        </Row>                    
                        <Button type="submit" onSubmit={this.handleSubmit}>Start Game</Button>
                       

                    
                    </Container>
                </form>
            </body>
        );
    }
}

export default AddTeam;