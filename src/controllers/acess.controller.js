'use strict'

const { CREATED, Ok } = require("../core/sucess.response");
const AccessService = require("../services/access.service");

class AccessController {

    login = async (req, res, next) => {
        new Ok({
            metadata: await AccessService.login(req.body)
        }).send(res);
    }

    signUp = async (req, res, next) => {

        new CREATED({
            message: 'Registed OK',
            metadata: await AccessService.signUp(req.body)
        }).send(res);

    }
}

module.exports = new AccessController();