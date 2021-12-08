const router = require('express').Router()

router.use( ( req, res, next ) => {
    console.log( `[${req.method}] ${req.baseUrl}${req.url}` )
    next()
} )

const routerV1 = require('./v1/routerV1')
router.use( '/api', routerV1 )

module.exports = router