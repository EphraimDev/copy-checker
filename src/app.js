import express from 'express';
import bodyParser from 'body-parser';
import morganLogger from 'morgan';
import cors from 'cors';
import config from './config';
import AppError from './handlers/AppError';
import expressValidator from "express-validator";

// routers
import authRouter from './routes/user';
import compareRouter from './routes/compare';


const app = express();

app.use(
    cors({
        maxAge: 1728000,
    }),
);
app.use(morganLogger('dev'));
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(bodyParser.json());
app.use(expressValidator());

//routes
app.get('/', (req, res) => res.send('Welcome to OnePipe API!'));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/compare', compareRouter);

// Match non existing routes
app.use('*', (req, res, next) => {
    next(new AppError('Invalid url', 400, true));
});

// Error handlers
app.use((err, req, res, next) => {
    if ('development' != config.env) {
        return next(err);
    }

    console.log(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - Stack: ${err.stack}`
    );
    err.stack = err.stack || '';
    let errorDetails = {
        status: 'error',
        message: err.message,
        statusCode: err.statusCode || 500,
        stack: err.stack,
    };

    console.log(errorDetails);

    res.status(err.statusCode || 500);
    return res.json(errorDetails);
});

app.use((err, req, res, next) => {
    if (!err.isOperational) {
        console.log(
            'An unexpected error occurred please restart the application!',
            '\nError: ' + err.message + ' Stack: ' + err.stack
        );
    }

    console.log(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
      } - Stack: ${err.stack}`
    );
    err.stack = err.stack || '';
    let errorDetails = {
        status: 'error',
        message: err.message,
        statusCode: err.statusCode || 500,
    };

    console.log(errorDetails);

    res.status(err.statusCode || 500);
    return res.json(errorDetails);
});

process.on('unhandledRejection', (reason, promise) => {
    throw reason;
});

process.on('uncaughtException', (error) => {
    console.log(`Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`);
    // process.exit(1);
});

process.on('SIGINT', () => {
    console.log(' Alright! Bye!');
    process.exit();
});

module.exports = app;