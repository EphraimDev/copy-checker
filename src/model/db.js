import mongoose from 'mongoose';
import config from '../config';

const connect = async () => {
    // stop ensureIndex deprecation warning
    mongoose.set('useCreateIndex', true);

    // Connect to our Database and handle any bad connections
    mongoose.Promise = global.Promise;

    let dbURL = "";

    if(process.env.NODE_ENV === "test"){
        dbURL = config.database.mongoUri
    }else {
        dbURL = config.database.uri;
    }

    const conn = await mongoose.connect(dbURL, {
        useNewUrlParser: true,
    });

    if(conn){
        console.log('Database connection created.');
        
    }else{
        
        console.log(`Something went wrong while i tried connecting to the database→ ${err.message}`);
    }
}

const close = () => {
    return mongoose.disconnect();
}

export {connect, close};