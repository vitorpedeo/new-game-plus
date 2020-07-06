const app = require('./app');
const db = require('./database/models');

db.sequelize
  .sync()
  .then(() => {
    app.listen(5000);
  })
  .catch(() => console.log('Failed to initialize server!'));
