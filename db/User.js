const { conn } = require('./conn');
const { Thing } = require('./Thing');
const { STRING, INTEGER } = conn.Sequelize;

const User = conn.define('user', {
    name: {
      type: STRING 
    },
    ranking: {
      type: INTEGER,
      defaultValue: 5
    }
  });

User.addHook("beforeDestroy", async (user) => {
  await Thing.destroy({
    where: {
      userId: user.id,
    },
  });
});

User.hasMany(Thing);

module.exports = { User };