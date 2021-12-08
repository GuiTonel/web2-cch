const jwt = require('jsonwebtoken')

class AuthMiddleware {
    async AdminAuth( req, res, next ) {
        let token = req.headers.authorization

        if (token == null) {
            return res.status(401).send({'succes': 'fail', 'message': 'Auth token not found'})
        }
        req.user = jwt.decode(token)
        console.log(req.user)
        if (!req.user.is_admin) {
            return res.status(401).send({'succes': 'fail', 'message': 'You have no permission to execute this action!'})
        }

        next()
    }

    async UserAuth( req, res, next ) {
        let token = req.headers.authorization
        if (token == null) {
            return res.status(401).send({'succes': 'fail', 'message': 'Auth token not found'})
        }
        req.user = jwt.decode(token)

        next()
    }

    async MeAuth (req, res, next) {
        let token = req.headers.authorization
        if (token == null) {
            return res.status(401).send({'succes': 'fail', 'message': 'Auth token not found'})
        }
        req.user = jwt.decode(token)

        if (req.user.id != req.params.id ) {
            return res.status(401).send({'succes': 'fail', 'message': 'You have no permission to execute this action!'})
        }

        next()
    }
}

module.exports = new AuthMiddleware()