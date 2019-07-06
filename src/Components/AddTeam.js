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


console.log(rendered);
class AddTeam extends Component{
    render(){
        return(
            <body>
                <Container>
                    <h1 className="Title" id="TeamsText">Teams!</h1>
                    <AddTeamButton/>
                    
                </Container>
            </body>
        );
    }
}

export default AddTeam;