import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();
const connectString = process.env.MONGO_URL
export async function dbConnection (){
    const client  = new MongoClient(connectString)
    await client.connect()
    console.log('DB connected')
    return client
}

export const client = await dbConnection()
