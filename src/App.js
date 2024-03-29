import './bootstrap.min.css';
import React from 'react';
import Game from './Components/Game';
import AddTeam from './Components/AddTeam';
import MainMenu from './Components/MainMenu';
import RoundStart from './Components/RoundStart';
import Page404 from './Components/Page404';
import { Route, Switch } from 'react-router';
import ScoreboardPage from './Components/ScoreboardPage';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            promptEvent: null
        };
        window.addEventListener('beforeinstallprompt', (event) => {
            this.setState({
                promptEvent: event
            });
        });
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path='/' component={() => <MainMenu promptEvent={this.state.promptEvent} />} />
                    <Route exact path='/teams' component={AddTeam} />
                    <Route exact path='/ready' component={RoundStart} />
                    <Route exact path='/play' component={Game} />
                    <Route exact path='/score' component={ScoreboardPage} />
                    <Route component={Page404} />
                </Switch>
            </div>
        );
    }
}

export default App;
//<Game word={words[0]} restricted={words.slice(1)}/>