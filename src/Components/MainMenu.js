import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class MainMenu extends Component{
    render(){
        return(
            <body>
                <Button >
                    <Link to="/teams">
                    play taboo!
                    </Link>
                </Button>
            </body>
        );
    }
}

export default MainMenu;