const readline = require('readline');
const wordList = require('./list.json');
const raw = require('./raw.json');
const fs = require('fs');

console.log('Loaded ' + Object.keys(wordList).length + ' words.');

const NUMBER_OF_RESTRICTED_WORDS = 5;

const stdin = readline.createInterface({
    input: process.stdout
});

for (const word of raw) {
    const resWords = [];
    for (let i = 0; i < NUMBER_OF_RESTRICTED_WORDS; i++) {
        resWords.push(word[i + 1].trim());
    }
    wordList[word[0].trim()] = resWords;
}

let buffer = [];

stdin.on('line', (line) => {
    line = line.trim();
    if (line.length > 0) {
        buffer.push(line);
    }
    if (buffer.length >= NUMBER_OF_RESTRICTED_WORDS + 1) {
        if (buffer[0] in wordList) {
            console.log('Word ' + buffer[0] + ' is already in the wordlist.');
        } else {
            const restrictedWords = buffer.slice(1, NUMBER_OF_RESTRICTED_WORDS + 1);
            wordList[buffer[0]] = restrictedWords;
        }
        buffer = [];
    }
});

stdin.on('close', () => {
    fs.writeFileSync('./list.json', JSON.stringify(wordList, null, 4));
});