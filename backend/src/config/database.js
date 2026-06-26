const { MongoClient } = require("mongodb");

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI);
         const client = new MongoClient(process.env.MONGODB_URI);
         await client.connect();

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;