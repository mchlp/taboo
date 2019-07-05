import React from 'react';
import Game from './Components/Game';

function App() {
  return (
    <div className="App">

      <Game teamName="Thisismyteam" restricted={["abc", "def", "efg"]} word="hello"/>  {/* testing!*/}
      
    </div>
  );
}

export default App;
