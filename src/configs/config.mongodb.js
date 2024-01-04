'use strict'

const dev = {
    app: {
        port: process.env.DEV_PORT
    },
    db: {
        connectString: process.env.DEV_CONNECT_STRING
    }
}

const pro = {
    app: {
        port: process.env.PRO_PORT
    },
    db: {
        connectString: process.env.PRO_CONNECT_STRING
    }
}

const config = { dev, pro }
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];