const { conn } = require('./conn');
const { STRING, INTEGER } = conn.Sequelize;
const { User } = require('./User');

const Thing = conn.define('thing', {
  name: {
    type: STRING,
  },
  ranking: {
    type: INTEGER,
    defaultValue: 1
  },
});

Thing.addHook('beforeValidate', (thing) => {
  if(!thing.userId){
    thing.userId = null;
  }
});

module.exports = { Thing };