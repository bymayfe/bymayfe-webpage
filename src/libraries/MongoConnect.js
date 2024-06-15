import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

const connection = {};

async function MongoConnect() {
  if (connection.isConnected) return;

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  return mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "runtime",
    })
    .then((r) => {
      connection.isConnected = r.connections[0].readyState;
      // console.log("isConnected", connection.isConnected);
      console.log("Connected to Mongoose Successfully");
    })
    .catch((err) => console.log(err));
}

export default MongoConnect;
