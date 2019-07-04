import wordList from './words.json';

const backend = {};

backend.getWord = () => {
    const words = Object.keys(wordList);
    const chosenWord = words[words.length * Math.random() << 0];
    const chosenWordData = [chosenWord, ...wordList[chosenWord]];
    delete wordList[chosenWord];
    return chosenWordData;
};

export default backend;