import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class MainMenu extends Component{
    render(){
        return(
            <body>
                <Link to="/teams">
                    <Button >
                    
                    play taboo!
                    
                    </Button>
                </Link>
            </body>
        );
    }
}

export default MainMenu;