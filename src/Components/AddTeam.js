import React, {Component} from 'react';
import { Button, Form, Row, Container, FormGroup, Col} from 'react-bootstrap';
import './Container.css';
import './AddTeam.css';

var teamNames = [];

class AddTeamButton extends Component{
    constructor(props){
        super(props);

        this.state ={
            value: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleClick(event){
        
        teamNames.push(event.target.value);
        console.log(this.state.value);

    }
    
    handleSubmit(event){
        this.setState({value: event.target.value});

    }
    render(){
        return(
            <Container>
                <FormGroup>
                    <Row>
                        <Col>
                            <Form.Control onChange={this.handleSubmit} type="text" value={this.state.value} placeholder="Team Name">
                            </Form.Control>
                        </Col>
                        <Col>
                            <Button type="submit" onClick={this.handleClick}>Add Team</Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Container>
        );
    } 
}

class Teams extends Component{
    constructor(props){
        super(props);
    }
  
    render(){

        let renderedTeamNames = [];

        for(let i = 0; i < teamNames.length; i++){
            renderedTeamNames.push(
                <Row>
                    <Button>
                        {teamNames[i]} 
                    </Button>
                </Row>
            );
        }
        return(
            <div>
                {renderedTeamNames}
            </div>
        );
    }
}


class AddTeam extends Component{
    render(){
        return(
            <body>
                <Container>
                    <h1 className="Title" id="TeamsText">Teams!</h1>
                    <AddTeamButton />
                    <Teams/>
                    

                </Container>
            </body>
        );
    }
}

export default AddTeam;