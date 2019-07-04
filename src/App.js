import React from 'react';
import Game from './Components/Game';
import backend from './backend';

function App() {
    return (
        <div className="App">
            <Game />  {/* testing!*/}
            <div>
                {backend.getWord().join(' ')}
            </div>
        </div>
    );
}

export default App;
