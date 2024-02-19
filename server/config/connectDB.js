import mongoose from "mongoose";




const connectDB = async (connection_string) => {

    try {
        await mongoose.connect(connection_string);
        console.log('DB connected');
    } catch (error) {
        console.log('Error occurred while connecting to DB');
    }
};

export default connectDB;