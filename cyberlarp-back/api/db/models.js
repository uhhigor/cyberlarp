const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  password: DataTypes.STRING,
  name: DataTypes.STRING,
}, {});

const Faction = sequelize.define('Faction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
}, {});

const Style = sequelize.define('Style', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
}, {});

const Character = sequelize.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: DataTypes.INTEGER,
    references: {
      model: Player,
      key: 'id',
    },
  },
  faction: {
    type: DataTypes.INTEGER,
    references: {
      model: Faction,
      key: 'id',
    },
  },
  style: {
    type: DataTypes.INTEGER,
    references: {
      model: Style,
      key: 'id',
    },
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
}, {});

const Gig = sequelize.define('Gig', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  reward: DataTypes.INTEGER,
}, {});

const GigCharacter = sequelize.define('GigCharacter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  gig: {
    type: DataTypes.INTEGER,
    references: {
      model: Gig,
      key: 'id',
    },
  },
  character: {
    type: DataTypes.INTEGER,
    references: {
      model: Character,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('ongoing', 'failed', 'completed'),
    defaultValue: 'ongoing',
  } ,
}, {});

Player.hasMany(Character, { as: 'characters' });
Character.belongsTo(Player);

Faction.hasMany(Character, { as: 'characters' });
Character.belongsTo(Faction);

Style.hasMany(Character, { as: 'characters' });
Character.belongsTo(Style);

Character.belongsToMany(Gig, { through: GigCharacter });
Gig.belongsToMany(Character, { through: GigCharacter });

sequelize.sync();

module.exports = {
  Player,
  Faction,
  Style,
  Character,
  Gig,
  GigCharacter,
};