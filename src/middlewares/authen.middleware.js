'use strict'

const { asyncHandler } = require('../helpers/asyncHandler')
const { findByUserId } = require('../services/keyToken.service')
const { UnauthorizedError } = require('../core/error.response')
const JWT = require('jsonwebtoken')

const HEADER = {
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization', // access token
    REFRESHTOKEN: 'refreshToken' // refresh token
}

const authentication = asyncHandler(async (req, res, next) => {
    // check userId missing
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new UnauthorizedError('Missing userId');
    // get access token
    const keyStore = await findByUserId(userId);
    if (!keyStore) throw new UnauthorizedError('Invalid userId');
    // 
    if (req.headers[HEADER.REFRESHTOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESHTOKEN];
            const decodeUser = JWT.verify(refreshToken, keyStore.privateKey);
            if (userId !== decodeUser._id) throw new UnauthorizedError('User not match');
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
    if (!accessToken) throw new UnauthorizedError('Missing accessToken');
    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
        if (userId !== decodeUser._id) throw new UnauthorizedError('Invalid userId');
        req.keyStore = keyStore;
        req.user = decodeUser;
        return next();
    } catch (error) {
        throw error
    }
})

module.exports = {
    authentication
}