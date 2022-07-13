const { conn } = require('./conn');
const { STRING, INTEGER } = conn.Sequelize;
const { User } = require('./User');

const Thing = conn.define('thing', {
  name: {
    type: STRING,
  },
  ranking: {
    type: INTEGER,
  },
});

Thing.addHook('beforeValidate', (thing) => {
  if(!thing.userId){
    thing.userId = null;
  }
});

Thing.addHook('beforeUpdate', async (thing) => {
    const result = await Thing.findAll({
        where: {
            userId: thing.userId
        }
    });
      if(result.length === 3) {
          throw new Error('Cannot create more instances');
      }
    return             
  }
);

module.exports = { Thing };