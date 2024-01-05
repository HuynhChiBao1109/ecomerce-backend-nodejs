'use strict'

const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

    static signUp = async ({ name, email, password }) => {
        try {
            // step 1: check email exist
            const hodelShop = await shopModel.findOne({ email }).lean();
            // return
            if (hodelShop) {
                return {
                    code: 'xxx',
                    message: 'email exist'
                }
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
                // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                // })

                const publicKey = crypto.getRandomValues(64).toString('hex');
                const privateKey = crypto.getRandomValues(64).toString('hex');

                console.log({ publicKey, privateKey });

                const keyStore = KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })

                if (!keyStore) {
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

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;