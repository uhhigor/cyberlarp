sequelize = require('./connection');

const { Player, Style, Faction, Character, Gig, GigCharacter } = require('./models');

async function initDb() {
console.log('Player:', Player);
await sequelize.sync();

await Player.findOrCreate({where: {id: 0}, defaults: {id: 0}});
await Style.findOrCreate({where: {id: 0}, defaults: {id: 0}});
await Faction.findOrCreate({where: {id: 0}, defaults: {id: 0}});
await Character.findOrCreate({where: {id: 0}, defaults: {id: 0}});
await Gig.findOrCreate({where: {id: 0}, defaults: {id: 0}});
await GigCharacter.findOrCreate({where: {id: 0}, defaults: {id: 0}});
}
module.exports = initDb;