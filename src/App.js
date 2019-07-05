import React from 'react';
import Game from './Components/Game';
import backend from './backend';

function App() {
    const words = backend.getWord();
    return (
        <div className="App">
            <Game word={words[0]} restricted={words.slice(1)}/>  {/* testing!*/}
        </div>
    );
}

export default App;
