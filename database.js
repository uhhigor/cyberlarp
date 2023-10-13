const fs = require('fs').promises;

module.exports = {
    getUsersData: getUsersData
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

