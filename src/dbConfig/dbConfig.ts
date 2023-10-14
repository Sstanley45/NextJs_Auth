import mongoose, { mongo } from "mongoose";


export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected successfully!');
            
        })

        connection.on('error', (err) => {
            console.log('mongoDB Connection Error!', + err);
            process.exit();
        })
        
    } catch (error) {
        console.log("error while connecting to database", error);
        
    }
}