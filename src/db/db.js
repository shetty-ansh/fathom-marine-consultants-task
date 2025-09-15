import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbConnected = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log(`\n Connected to MongoDB Successfully @ ${mongoose.connection.host}`)
        return true;

    } catch (error) {
        console.log("Error connecting to Database", error)
    }
}

export default connectDB