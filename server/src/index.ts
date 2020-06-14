import * as dotenv from "dotenv";
import express from "express"; 
import helmet from "helmet";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import multer from 'multer';
import * as media from "./media/media.router";
import * as upload from "./upload/upload.router";
import * as dotenvutil from './util/dotenv'

dotenv.config();

const PORT = parseInt(dotenvutil.load('PORT'), 10);
const uploads = multer({ dest: '../files/uploads/' });

const app = express();

mongoose.connect(`mongodb://localhost/${ dotenvutil.load('DATABASE_IP') }`);

// Middleware
app.use(helmet());
app.use(bodyParser.json());

// Routes
app.use("/media", media.router);
app.use('/upload', uploads.array('media'), upload.router)

// Start Server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
