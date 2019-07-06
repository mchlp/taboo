import React, {Component} from 'react';
import { Button, Form, Row, Container, FormGroup, Col} from 'react-bootstrap';
import './Container.css';
import './AddTeam.css';


const renderedTeamNames = [];
class AddTeamButton extends Component{
    constructor(props){
        super(props);

        this.state ={
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({value: event.target.value});
        console.log(`saved ${this.state.value}`);
        document.getElementById('input').value = '';

    }

    handleChange(event){
        event.preventDefault();
        //this.setState({value: event.target.value});
        console.log(this.state.value);
    }


    render(){
        
        for(let i = 0; i < this.props.teamNames.length; i++){
            renderedTeamNames.push(
                <Row> 
                    <Button>
                        {this.props.teamNames[i]} 
                    </Button>
                </Row>
            );
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
                    {renderedTeamNames}
                </div>
            </Container>
            

        );
    } 
}


console.log(renderedTeamNames);
class AddTeam extends Component{
    render(){
        return(
            <body>
                <Container>
                    <h1 className="Title" id="TeamsText">Teams!</h1>
                    <AddTeamButton teamNames={[]}/>
                    
                </Container>
            </body>
        );
    }
}

export default AddTeam;