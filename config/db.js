const mongoose = require("mongoose");
const mongo_uri = "mongodb://127.0.0.1:27017/userdb"
const connectDB = async () => {
  try {
    await mongoose.connect(mongo_uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("MongoDB Connected Successfully.");
  } catch (error) {
    console.log("MongoDB Connection Failed.");
    process.exit(1);
  }
};

module.exports = connectDB;