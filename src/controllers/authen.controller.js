'use strict'

const { CREATED, Ok } = require("../core/sucess.response");
const AuthenService = require("../services/access.service");

class AuthenController {

    logout = async (req, res, next) => {
        new Ok({
            message: 'Logout OK',
            metadata: await AuthenService.logout({ keyStore: req.keyStore })
        }).send(res);
    }

    login = async (req, res, next) => {
        new Ok({
            metadata: await AuthenService.login(req.body)
        }).send(res);
    }

    signUp = async (req, res, next) => {

        new CREATED({
            message: 'Registed OK',
            metadata: await AuthenService.signUp(req.body)
        }).send(res);

    }
}

module.exports = new AuthenController();