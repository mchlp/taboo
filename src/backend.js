import wordList from './words.json';

const backend = {};

backend.settings = {
    roundTime: null,
    failPenalty: null,
    capPoints: null,
    numPlayers: null,
    teamNames: [],
    teamColours: []
};

backend.state = {
    pass: [],
    fail: [],
    curTurn: null,
    roundEndTime: null
};

/**
 * To be called to set up the game by providing game settings.
 */
backend.startGame = (roundTime, failPenalty, capPoints, numPlayers) => {
    backend.settings = {
        roundTime,
        failPenalty,
        capPoints,
        numPlayers,
        teamNames: [],
        teamColours: []
    };

    backend.state = {
        pass: Array(numPlayers).fill(0),
        fail: Array(numPlayers).fill(0),
        curTurn: 0,
        roundEndTime: 0
    };
};

/**
 * To be called to set up the teams by providing team names and team colours.
 */
backend.setupTeams = (teamNames, teamColours) => {
    backend.settings.teamNames = teamNames;
    backend.settings.teamColours = teamColours;
};

/**
 * Returns the number of players
 */
backend.getNumPlayers = () => {
    return backend.settings.numPlayers;
};

/**
 * Returns an array of the team names.
 */
backend.getTeamNames = () => {
    return backend.settings.teamNames;
};

/**
 * Returns an array of the team colours.
 */
backend.getTeamColours = () => {
    return backend.settings.teamColours;
};

/**
 * Returns an array of the scores of the teams.
 */
backend.getScores = () => {
    return [backend.state.pass[0] - (backend.state.fail[0] * backend.settings.failPenalty), backend.state.pass[1] - (backend.state.fail[1] * backend.settings.failPenalty)];
};

/**
 * Returns the index of the team who's turn it is.
 */
backend.getCurrentTeam = () => {
    return backend.state.curTurn;
};

/**
 * To be called when a round is started. This function returns a number, the Unix time of when the round should end.
 */
backend.startRound = () => {
    backend.state.roundEndTime = Date.now() + (backend.settings.roundTime * 1000);
    return backend.state.roundEndTime;
};

/**
 * To be called when a word is passed. The function will return a boolean, stating whether the current player has won (true if player has won, false if game should continue).
 */
backend.score = () => {
    backend.state.pass[backend.state.curTurn]++;
    const scores = backend.getScores;
    if (scores[0] >= backend.settings.capPoints || scores[1] >= backend.settings.capPoints) {
        return true;
    }
    return false;
};

/**
 * To be called when a word is failed.
 */
backend.failWord = () => {
    backend.state.fail[backend.state.curTurn]++;
};

/**
 * To be called when a round is finished (time is up).
 */
backend.endRound = () => {
    backend.state.curTurn++;
    if (backend.state.curTurn === backend.settings.numPlayers) {
        backend.state.curTurn = 0;
    }
};

/**
 * Get a word and its corresponding restricted words from the wordlist.
 */
backend.getWord = () => {
    const words = Object.keys(wordList);
    const chosenWord = words[words.length * Math.random() << 0];
    const chosenWordData = [chosenWord, ...wordList[chosenWord]];
    delete wordList[chosenWord];
    return chosenWordData;
};

export default backend;