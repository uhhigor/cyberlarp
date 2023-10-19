const fs = require('fs').promises;

module.exports = {
    getUsersData: getUsersData,
    getStylesData: getStylesData,
    getTeamsData: getTeamsData
}

async function getUsersData() {
    try {
        const data = await fs.readFile('./data/users.json');
        console.log("Users data retrieved");
        return (JSON.parse(data)).user;
    } catch (err) {
        throw err;
    }
}

async function getStylesData() {
    try {
        const data = await fs.readFile('./data/styles.json');
        console.log("Styles data retrieved");
        return (JSON.parse(data)).style;
    } catch (err) {
        throw err;
    }
}

async function getTeamsData() {
    try {
        const data = await fs.readFile('./data/teams.json');
        console.log("Teams data retrieved");
        return (JSON.parse(data)).team;
    } catch (err) {
        throw err;
    }
}

