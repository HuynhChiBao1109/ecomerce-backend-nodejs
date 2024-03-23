'use strict'

const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const crypto = require('node:crypto');
const { BadRequestError } = require("../core/error.response");
// service ///
const KeyTokenService = require("./keyToken.service");

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

    static login = async ({ email, password, refreshToken = null }) => {
        // step 1: check email exist in dbs
        const foundShop = await shopModel.findOne({ email: email }).lean()
        if (!foundShop) throw new BadRequestError('Shop is not registed');
        // step 2: match password
        const matchPass = bcrypt.compare(password, foundShop.password);
        if (!matchPass) throw BadRequestError('Password is not match');
        // step 3: create privateKey, publicKey
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            }
        });
        // step 4: create token pair
        const tokens = await createTokenPair(foundShop, publicKey, privateKey);
        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            publicKey: publicKey,
            userId: foundShop._id
        })
        // return 
        return {
            shop: getInfoData({
                field: ['_id'],
                object: foundShop
            }),
            tokens
        }
    }


    static signUp = async ({ name, email, password }) => {
        // step 1: check email exist
        const hodelShop = await shopModel.findOne({ email }).lean();
        if (hodelShop) {
            console.error('error: Shop already registerd');
            throw new BadRequestError('error: Shop already registerd')
        }
        // step 2 : create new shop
        const passwordHash = await bcrypt.hash(password, 10);
        // create new shop
        const newShop = await shopModel.create({
            name: name,
            email: email,
            password: passwordHash,
            roles: [RoleShop.SHOP]
        });
        return {
            shop: newShop
        }
    }

    static logout = async ({ keyStore }) => {
        const delKey = KeyTokenService.removeToken(keyStore._id);
        console.log('delKey::', delKey);
        return delKey
    }
}

module.exports = AccessService;