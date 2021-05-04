import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import mongoose from 'mongoose';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';

const app = express()
const { BAD_REQUEST, OK } = StatusCodes;


/************************************************************************************
 *                              Stablish mongo-db connection
 ***********************************************************************************/

 mongoose.connect(`mongodb://${process.env.DB_HOST!}:${process.env.DB_PORT!}/${process.env.DB_NAME!}`, {
     useCreateIndex: true,
     useNewUrlParser: true,
     useUnifiedTopology: true
 }, () => {
     console.log("Mongo-db connection Stablished !!!");
 })

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development or qa
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'qa') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use(`/api/${process.env.VERSION!}`, BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message
    });
});



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get(`/api/${process.env.VERSION!}/`, (req: Request, res: Response) => {
    res.status(OK).json({
        data: {
            message: "Welcome to the E-Library api !!!"
        }
    });
});

// Export express instance
export default app;
