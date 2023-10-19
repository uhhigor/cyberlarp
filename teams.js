var db = require('./database.js');

module.exports = {
    getTeamByID: getTeamByID
}

async function getTeamByID(id) {
    try {
        const teamsData = await db.getTeamsData();
        for(const team of teamsData) {
            if(team.id == id) {
                return team;
            }
        }
        console.error("Team not found");
        return undefined;
    } catch (err) {
        throw err;
    }
}


