const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  password: {
    type: DataTypes.STRING, defaultValue: '',
  },
  name: {
    type: DataTypes.STRING, defaultValue: '',
  },
}, {});

const Faction = sequelize.define('Faction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING, defaultValue: '',
  },
  description: {
    type: DataTypes.STRING, defaultValue: '',
  },
}, {});

const Style = sequelize.define('Style', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING, defaultValue: '',
  },
  description: {
    type: DataTypes.STRING, defaultValue: '',
  },
}, {});

const Character = sequelize.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING, defaultValue: '',
  },
  description: {
    type: DataTypes.STRING, defaultValue: '',
  },
}, {});

const Gig = sequelize.define('Gig', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING, defaultValue: '',
  },
  description: {
    type: DataTypes.STRING, defaultValue: '',
  },
  reward: {
    type: DataTypes.INTEGER, defaultValue: 0,
  },
}, {});

const GigCharacter = sequelize.define('GigCharacter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM('ongoing', 'completed', 'failed'),
    defaultValue: 'ongoing',
  },
}, {});

Player.hasOne(Character, { as: 'characters' });
Character.belongsTo(Player);

Faction.hasMany(Character, { as: 'characters' });
Character.belongsTo(Faction);

Style.hasMany(Character, { as: 'characters' });
Character.belongsTo(Style);

Character.belongsToMany(Gig, { through: GigCharacter });
Gig.belongsToMany(Character, { through: GigCharacter });

Gig.hasMany(GigCharacter, { as: 'gigCharacters' });
GigCharacter.belongsTo(Gig);

Character.hasMany(GigCharacter, { as: 'gigCharacters' });
GigCharacter.belongsTo(Character);

sequelize.sync();

module.exports = {
  Player,
  Faction,
  Style,
  Character,
  Gig,
  GigCharacter,
};