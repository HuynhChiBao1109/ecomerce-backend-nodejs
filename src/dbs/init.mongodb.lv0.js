'use strict';
// simple connect
const mongoose = require('mongoose');

const connectString = 'mongodb+srv://baohc110902:4OVcC4ZF9ND22oX1@shopdev.zjjv5ft.mongodb.net/';


mongoose.connect(connectString)
    .then(() => console.log('Connect to database successfully'))
    .catch(err => console.log(err));


//dev
if (1 === 1) {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true })
}

module.exports = mongoose;