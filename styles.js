var db = require('./database.js');

module.exports = {
    getStyleByID: getStyleByID
}

async function getStyleByID(id) {
    try {
        const stylesData = await db.getStylesData();
        for(const style of stylesData) {
            if(style.id == id) {
                return style;
            }
        }
        console.error("Style not found");
        return undefined;
    } catch (err) {
        throw err;
    }
}


