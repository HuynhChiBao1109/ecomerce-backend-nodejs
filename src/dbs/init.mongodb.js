'use strict';
// single turn
const mongoose = require('mongoose');
const { db: { connectString } } = require('../configs/config.mongodb');
const connectDB = `mongodb://${connectString}/shopDev`;

const { countConnect } = require('../helpers/check.connect');
class Database {
    constructor() {
        this.connect();
    }
    // connect
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true })
        }

        mongoose.connect(connectDB,
            {
                maxPoolSize: 50
            }
        )
            .then(_ => {
                console.log('Connect to database successfully', countConnect());
            })
            .catch(err => console.log(err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;