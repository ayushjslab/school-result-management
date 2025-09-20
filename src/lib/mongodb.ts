/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

async function connectDB() {
    if(cached.conn) return cached.conn;

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: "School",
            bufferCommands: false
        })
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;