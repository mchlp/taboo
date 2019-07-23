import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Container.css';
import './MainMenu.css';

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.install = this.install.bind(this);
    }

    install() {
        console.log('clikc1');
        if (this.props.promptEvent) {
            console.log(this.props.promptEvent);
            console.log(this.props.prompt);
            this.props.promptEvent.prompt();
        }
    }

    render() {
        return (
            <Container id="mainmenu">
                <h1 id='taboo-title'>Taboo!</h1>
                <Link to="/teams">
                    <Button className="turquoise-button" id="play-button">
                            play taboo
                    </Button>
                </Link>
                <Button hidden={!this.props.promptEvent} onClick={this.install} className="turquoise-button" id="install-button">
                        install
                </Button>
            </Container>
        );
    }
}

export default MainMenu;