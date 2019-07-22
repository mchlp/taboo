import React, {Component} from 'react';
import { Container, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Container.css';
import './MainMenu.css';

class MainMenu extends Component{
    render(){
        return(
            <body>
                <Container id="mainmenu">
                    <h1 id='taboo-title'>Taboo!</h1>
                    <Link to="/teams">
                        <Button className="turquoise-button" id="play-button">
                            play taboo
                        </Button>
                    </Link>
                </Container>
            </body>
        );
    }
}

export default MainMenu;