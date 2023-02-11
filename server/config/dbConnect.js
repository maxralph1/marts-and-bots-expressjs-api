const mongoose = require('mongoose');

const dbConnection = async () => {
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    // console.log("DB Connected");
  } catch (err) {
    console.error(err);
  }
}


module.exports = dbConnection;