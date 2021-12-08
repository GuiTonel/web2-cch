const router = require('express').Router()
const authMiddleware = require('../../middleware/authMiddleware')
const postController = require('../../controller/postController')

router.get( '/posts/:id', postController.getPost )
router.put( '/posts/:id', authMiddleware.UserAuth, postController.editPost )
router.delete( '/posts/:id', authMiddleware.UserAuth, postController.deletePost )

router.put( '/posts/:id/vote', authMiddleware.UserAuth, postController.vote )

module.exports = router