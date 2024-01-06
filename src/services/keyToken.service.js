'use strict'

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            // save token to db
            // level 0
            // const token = await keyTokenModel.create({
            //     user: userId,
            //     privateKey,
            //     publicKey
            // })

            //return token ? token.publicKey : null;

            // level xx
            const filter = { user: userId }, update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }, options = { upsert: true, new: true };

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);

            return tokens ? tokens.publicKey : null;

        } catch (error) {
            return error;
        }
    }
}

module.exports = KeyTokenService;