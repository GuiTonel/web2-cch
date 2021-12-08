const routerV1 = require('express').Router()

const userRouter = require('./userRouter')
const concursoRouter = require('./concursoRouter')
const postRouter = require('./postRouter')

routerV1.use( '/v1', 
                userRouter, 
                concursoRouter, 
                postRouter 
            )

module.exports = routerV1