import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("DB connected");
        
    })
    try {
        await mongoose.connect(process.env.MONGO_URI);
    }
    catch (error) {
        console.error("Fail to connect DB:", error);
    }
}

export default connectDB;
