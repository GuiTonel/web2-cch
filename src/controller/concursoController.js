const ConcursoModel = require('../model/concursoModel')
const userModel = require('../model/userModel')
const PostModel = require('../model/postModel')
const fs = require('fs')


class ConcursoController {
    async createConcurso(req, res) {
        req.body.criador = req.user.id
        let concurso = new ConcursoModel(req.body)
        await concurso.save()
        return res.send({ 'status': 'success', 'concurso': concurso.toJSON() })
    }

    async editConcurso(req, res) {
        await ConcursoModel.findOneAndUpdate( { _id: req.params.id }, req.body )
        let concurso = await ConcursoModel.findById(req.params.id)
        return res.send({ 'status': 'success', 'concurso': concurso.toJSON() })
    }

    async deleteConcurso(req, res) {
        await ConcursoModel.findOneAndRemove({ _id: req.params.id })
        return res.send({ 'status': 'success', 'message': 'Concurso removido com sucesso!' })
    }

    async getConcurso(req, res) {
        let concurso = await ConcursoModel.findById(req.params.id).populate({path: 'posts', options: { sort: { 'created_at': -1 } } })
        if (concurso.ganhador != null) {
            concurso = await concurso.populate('ganhador')
        }
        return res.send({ 'status': 'success', 'concurso': concurso.toJSON() })
    }

    async listConcurso(req, res) {
        let concursos = await ConcursoModel.find().sort([['created_at', -1]])
        concursos.map( (concurso) => concurso.toJSON() )
        return res.send({ 'status': 'success', 'concursos': concursos })
    }

    async encerrarConcurso(req, res) {
        let concurso = await ConcursoModel.findById(req.params.id).populate({path: 'posts', options: { sort: { 'num_votos': -1 } } } )
        let mostVotedPost = concurso.posts[0]

        concurso.ganhador = mostVotedPost
        await concurso.save()
        concurso = await concurso.populate('ganhador')
        let perfilAutor = await userModel.findOne({ 
            where: {
                id: concurso.ganhador.autor
            }
        })
        perfilAutor.senha = undefined
        let concursoJson = concurso.toJSON()
        concursoJson.ganhador.autor = perfilAutor
        return res.send({ 'status': 'success', 'concurso': concursoJson })
        
    }

    async addPost(req, res) {
        let concurso = await ConcursoModel.findById(req.params.id)
        
        req.body.autor = req.user.id

        console.log(req.file)
        if (concurso.tipo != 'T') {
            req.body.arquivo = Buffer.from( fs.readFileSync(req.file.path) ).toString('base64')
        }
        let post = new PostModel(req.body)
        await post.save()
        
        concurso.posts.push( post )
        await concurso.save()

        concurso = await concurso.populate({path: 'posts', options: { sort: { 'created_at': -1 } } })

        return res.send({ 'status': 'success', 'concurso': concurso.toJSON() })
    }
}

module.exports = new ConcursoController()
