import * as dotenv from "dotenv";
import express from "express"; 
import helmet from "helmet";
import bodyParser from 'body-parser';
import mongoose from "mongoose";

import * as media from "./media/media.router";
import * as dotenvutil from './util/dotenv'


dotenv.config();
const PORT = parseInt(dotenvutil.load('PORT'), 10);

mongoose.connect(`mongodb://localhost/${ dotenvutil.load('DATABASE_IP') }`);

const app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.json());

// Routes
app.use("/media", media.router);

// Start Server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
