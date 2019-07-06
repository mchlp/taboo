import wordList from './words.json';

const backend = {};

backend.startGame = (roundTime, failPenalty, capPoints) => {
    backend.settings = {
        roundTime,
        failPenalty,
        capPoints
    };

    backend.state = {
        pass: [0, 0],
        fail: [0, 0],
        curTurn: 0,
    };
};

backend.getWord = () => {
    const words = Object.keys(wordList);
    const chosenWord = words[words.length * Math.random() << 0];
    const chosenWordData = [chosenWord, ...wordList[chosenWord]];
    delete wordList[chosenWord];
    return chosenWordData;
};

export default backend;