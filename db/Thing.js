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

//attempt to solve final feature
// Thing.addHook('beforeCreate', async (thing) => {
//   try {
//       const result = await Thing.findAll({
//           where: {
//               thingId: thing.id
//           }
//       });
//       if(result.length === 3) {
//           throw new Error(`Cannot create more instances for ${instance.thingId}`);
//       }
//   }
//   catch(e) {
//       throw e;
               
//   }
// });

module.exports = { Thing };