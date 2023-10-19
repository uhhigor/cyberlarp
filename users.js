var db = require('./database.js');

module.exports = {
    getUserByID: getUserByID
}

async function getUserByID(id) {
    try {
        const userData = await db.getUsersData();
        for(const user of userData) {
            if(user.id == id) {
                return user;
            }
        }
        console.error("User not found");
        return undefined;
    } catch (err) {
        throw err;
    }
}


