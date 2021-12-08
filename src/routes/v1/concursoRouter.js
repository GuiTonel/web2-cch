const router = require('express').Router()
const authMiddleware = require('../../middleware/authMiddleware')
const concursoController = require('../../controller/concursoController')
const multer = require('multer')
const file = multer({
    dest: 'src/public'
})

router.post( '/concursos', authMiddleware.AdminAuth, concursoController.createConcurso )
router.get( '/concursos', concursoController.listConcurso )
router.put( '/concursos/:id', authMiddleware.AdminAuth, concursoController.editConcurso )
router.delete( '/concursos/:id', authMiddleware.AdminAuth, concursoController.deleteConcurso )
router.get('/concursos/:id', concursoController.getConcurso )

router.put('/concursos/:id/encerrar', authMiddleware.AdminAuth, concursoController.encerrarConcurso )
router.post( '/concursos/:id/posts', authMiddleware.UserAuth, file.single('file'), concursoController.addPost )

module.exports = router