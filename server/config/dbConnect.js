const mongoose = require('mongoose');

const dbConnection = async () => {
  mongoose.set('sanitizeFilter', true);
  mongoose.set('strictQuery', false);
  // run all these once on production and uncomment them so they become false
  // mongoose.set('autoIndex', false);     //for production only
  // mongoose.set('createCollection', false);     //for production only

  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    // console.log("DB Connected");
  } catch (error) {
    console.error(error);
  }
}


module.exports = dbConnection;