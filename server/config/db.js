const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoBD connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
