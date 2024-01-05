'use strict'

const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const crypto = require('node:crypto');
const { BadRequestError } = require("../core/error.response");

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

    static signUp = async ({ name, email, password }) => {
        // step 1: check email exist

        const hodelShop = await shopModel.findOne({ email }).lean();
        // return
        if (hodelShop) {
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

        if (newShop) {
            // create privateKey, publicKey

            const publicKey = crypto.randomBytes(64).toString('hex');
            const privateKey = crypto.randomBytes(64).toString('hex');

            console.log({ publicKey, privateKey });

            const keyStore = KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })

            if (!keyStore) {
                // throw new BadRequestError('error: publicKeyString error')
                return {
                    code: 'xxx',
                    message: 'publicKeyString error'
                };
            }

            // create token pair
            const tokens = await createTokenPair({
                userId: newShop._id,
                email
            }, publicKey, privateKey);
            console.log('Created token sucess::', tokens)

            return {
                code: 201,
                metadata: {
                    shop: getInfoData({
                        field: ['_id', 'name', 'email'],
                        object: newShop
                    }),
                    tokens
                }
            }
        }

        return {
            code: 200,
            metadata: null
        }

    }
}

module.exports = AccessService;