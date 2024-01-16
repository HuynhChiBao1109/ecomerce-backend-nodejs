'use strict'

const { AuthenError } = require('../core/error.response');
const { findById } = require('../services/apiKey.service');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'missing api key'
            })
        }
        // check objkey
        const objKey = await findById(key);
        if (!objKey) {
            return res.status(403).json({
                message: 'invalid api key'
            })
        }
        req.objKey = objKey;
        console.log("Req objkey::", req.objKey)
        return next();
    } catch (error) {

    }
}

const permission = (permissions) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'permission dinied'
            });
        }
        console.log('permissions::', req.objKey.permissions);
        // check valid permission
        const validPermission = req.objKey.permissions.includes(permissions);

        if (!validPermission) {
            return res.status(403).json({
                message: 'permission dinied'
            });
        }
        return next();
    }
}

module.exports = {
    apiKey,
    permission,

}