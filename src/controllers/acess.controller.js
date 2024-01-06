'use strict'

const { CREATED } = require("../core/sucess.response");
const AccessService = require("../services/access.service");

class AccessController {
    signUp = async (req, res, next) => {

        new CREATED({
            message: 'Registed OK',
            metadata: await AccessService.signUp(req.body)
        }).send(res);

    }
}

module.exports = new AccessController();