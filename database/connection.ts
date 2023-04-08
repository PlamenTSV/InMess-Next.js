import mongoose from "mongoose";

interface Connection{
    isConnected: number;
}

const connection:Connection = {isConnected: 0};

const connectMongo = async () => {
    if(connection.isConnected){
        console.log('Already established connection');
        return;
    }

    try{
        mongoose.set("strictQuery", false);

        const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL as string);

        connection.isConnected = db.connections[0].readyState;
        console.log('New database connection');
    } catch (error){
        console.log(error);
    }
}

export default connectMongo;
