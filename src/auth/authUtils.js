'use strict'

const JWT = require('jsonwebtoken');
const { asyncHandler } = require('../helpers/asyncHandler');
const { AuthenError } = require('../core/error.response');
const { findByUserId } = require('../services/keyToken.service');

const HEADER = {
    API_KEY: 'x-api-key', // key save on apiKey dbs
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization', // access token
    REFRESHTOKEN: 'refreshToken' // refresh token
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        console.log('payload::', payload);
        // accessToken 
        const accessToken = await JWT.sign(payload, privateKey, {
            'algorithm': 'RS256',
            expiresIn: '2 days'
        });
        // refreshToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            'algorithm': 'RS256',
            expiresIn: '7 days'
        });
        console.log('Generated accessToken::', accessToken);
        console.log('Generated refreshToken::', refreshToken);
        //
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error('Verify error::', err)
            } else {
                console.log('decode::', decode)
            }
        })

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {

    }
}

const authenticationV2 = asyncHandler(async (req, res, next) => {
    // check userId missing
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthenError('Missing userId');
    // get access token
    const keyStore = await findByUserId(userId);
    if (!keyStore) throw new AuthenError('Invalid userId');
    // 
    if (req.headers[HEADER.REFRESHTOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESHTOKEN];
            const decodeUser = JWT.verify(refreshToken, keyStore.privateKey);
            if (userId !== decodeUser.userId) throw new AuthenError('Invalid userId');
            req.keyStore = keyStore;
            req.user = decodeUser;
            req.refreshToken = refreshToken;
            return next();
        } catch (error) {
            throw error
        }
    }

    // verify access token
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new AuthenError('Missing accessToken');
    // check key store with userId
    console.log('accessToken::', accessToken);
    console.log('keyStore::', keyStore.publicKey);
    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
        console.log('decodeUser::', decodeUser);
        if (userId !== decodeUser.userId) throw new AuthenError('Invalid userId');
        req.keyStore = keyStore;
        return next();
    } catch (error) {
        throw error
    }
})

module.exports = {
    createTokenPair,
    authenticationV2
}