const mongoose = require("mongoose");

const username = "mernuser";
const password = "mernuser";

const MONGO_URI = `mongodb+srv://${username}:${password}@cluster0.mjwjvyq.mongodb.net/backend-dev?retryWrites=true&w=majority`;

const connectToDb = async () => {
  try {
    mongoose.set("strictQuery", false);

    const connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
