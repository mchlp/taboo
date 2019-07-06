import React from 'react';
import Game from './Components/Game';
import AddTeam from './Components/AddTeam';
import MainMenu from './Components/MainMenu';
import Scoreboard from './Components/Scoreboard';
import Page404 from './Components/Page404';
import { Route, Switch } from 'react-router';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={MainMenu} />
                <Route exact path='/teams' component={AddTeam} />
                <Route exact path='/play' component={Game} />
                <Route exact path='/score' component={Scoreboard} />
                <Route component={Page404} />
            </Switch>
        </div>
    );
}

export default App;
//<Game word={words[0]} restricted={words.slice(1)}/>