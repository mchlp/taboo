import wordList from './words.json';

const backend = {};

/**
 * To be called to set up the game by providing game settings.
 */
backend.startGame = (roundTime, failPenalty, capPoints) => {
    backend.settings = {
        roundTime,
        failPenalty,
        capPoints,
        teamNames: ['Team 1', 'Team 2'],
        teamColours: ['#DC143C', '	#4169E1']
    };

    backend.state = {
        pass: [0, 0],
        fail: [0, 0],
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
backend.passWord = () => {
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
    backend.state.curTurn = backend.state.curTurn === 1 ? 0 : 1;
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