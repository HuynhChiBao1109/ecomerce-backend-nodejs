'use strict'

const JWT = require('jsonwebtoken');
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken 
        const accessToken = await JWT.sign(payload, privateKey, {
            expiresIn: '1h'
        });
        // refreshToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '1 day'
        });

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

module.exports = {
    createTokenPair
}