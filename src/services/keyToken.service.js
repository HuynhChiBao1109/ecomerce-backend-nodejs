'use strict'

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            // save token to db
            const token = await keyTokenModel.create({
                user: userId,
                privateKey,
                publicKey
            })

            return token ? token.publicKey : null;

        } catch (error) {
            return error;
        }
    }
}

module.exports = KeyTokenService;