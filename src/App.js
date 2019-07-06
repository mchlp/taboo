import React from 'react';
import Game from './Components/Game';
import AddTeam from './Components/AddTeam';
import backend from './backend';

function App() {
    const words = backend.getWord();
    return (
        <div className="App">
            <AddTeam />  {/* testing!*/ }
        </div>
    );
}

export default App;
//<Game word={words[0]} restricted={words.slice(1)}/>