import 'dotenv/config';
import { MongoClient } from 'mongodb';

const { VPS_IP, MONGO_PORT, MONGO_USER, MONGO_PW } = process.env

// const uri = `mongodb://${MONGO_USER}:${MONGO_PW}@${VPS_IP}:${MONGO_PORT}`;

const uri = `mongodb://myUserAdmin:floofer@${VPS_IP}:27017`;

export const client = new MongoClient(uri);