import React, {Component} from 'react';
import { Button, Form, Row, Container, FormGroup, Col} from 'react-bootstrap';
import './Container.css';
import './AddTeam.css';


const rendered = []; //stores submitted names
const teamNamesRendered = []; //rendered name button components

class AddTeamButton extends Component{
    constructor(props){
        super(props);

        this.state ={
            value: '', //temporarily stores the onChange value 
            name: '', //value of last team name that was submitted
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        this.setState({name: this.state.value});
        rendered.push(this.state.name);

        //clearing the input form
        document.getElementById('input').value = '';
    }

    handleChange(event){
        event.preventDefault();
        this.setState({value: event.target.value});
    }

    render(){
        if(!rendered.includes(this.state.name) && !(this.state.name ==='')){
            teamNamesRendered.push(
                <Row>
                    <Button>{this.state.name}</Button>
                </Row>
            );
            rendered.push(this.state.name);
        }else{
            console.log('name taken, please enter a different name');
        }
        
        return(
            <Container>
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
                            <button type="submit" onClick={this.handleSubmit}>Add Team</button>
                        </Col>
                    </Row>
                </form>
                <div>
                    {teamNamesRendered}
                </div>
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