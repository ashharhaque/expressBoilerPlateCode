const mongoose = require('mongoose');

const DBCluster = process.env.DATABASE;


let DB_URL = DBCluster;
DB_URL = DB_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
DB_URL = DB_URL.replace('<DB_NAME>', process.env.DB_NAME);



console.log(`DB_URL`, DB_URL);

module.exports = () => {
  console.log('connecting to DB...');
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connection successful!`.blue.bold))
    .catch((err) => {
      console.log('DB Connection Failed !');
      console.log(`err`, err);
    });
};