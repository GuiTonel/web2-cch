const router = require('express').Router()
const userController = require('../../controller/userController')
const authMiddleware = require('../../middleware/authMiddleware')

router.post( '/users', userController.createUser )
router.put( '/users/:id', authMiddleware.MeAuth, userController.editUser )
router.delete( '/users/:id', authMiddleware.MeAuth, userController.deleteUser )
router.get('/users/:id', userController.getUser )
router.post( '/users/login', userController.login )

module.exports = router