import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import 'Container.css';

class TeamButton extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Button>
                {this.props.text};
            </Button>
        );
    }
}


class AddTeam extends Component{
    render(){
        return(
            <body>
                <Container>
                    <h1 className="Title" id="TeamsText">Teams!</h1>
                        
                        
                    

                </Container>
            </body>
        );
    }
}

export default AddTeam;