const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('postgres://postgres:frootloops@localhost:5432/galaxycard');


// try {
//     sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }
module.exports = sequelize;