const PostModel = require('../model/postModel')
const userModel = require('../model/userModel')

class PostController {
    async editPost(req, res) {
        let post = await PostModel.findOne( { _id: req.params.id } )
        if (post.autor != req.user.id ) {
            return res.status(401).send({'succes': 'fail', 'message': 'This post does not belong to you'})
        }
        post = await PostModel.findByIdAndUpdate( req.params.id, req.body )

        return res.send({ 'status': 'success', 'post': post.toJSON() })
    }

    async getPost(req, res) {
        let post = await PostModel.findById( req.params.id )
        let autor = await userModel.scope('noPassword').findOne({ 
            where: {
                id: post.autor
            }
        })
        let votantes = await userModel.scope('noPassword').findOne({ 
            where: {
                id: post.votos
            }
        })
        let postJson = post.toJSON()
        postJson.autor = autor
        postJson.votos = votantes

        return res.send({ 'status': 'success', 'post': postJson })
    }

    async deletePost(req, res) {
        let post = await PostModel.findOne({ _id: req.params.id })
        if (post.autor != req.user.id ) {
            return res.status(401).send({'succes': 'fail', 'message': 'This post does not belong to you'})
        }
        await PostModel.findOneAndRemove({ _id: req.params.id })
        return res.send({ 'status': 'success', 'message': 'Post removido com sucesso!' })
    }

    async vote(req, res) {
        let post = await PostModel.findById(req.params.id)

        if ( post.votos.includes(req.user.id) ) {
            post.votos.splice( post.votos.indexOf(req.user.id, 1) )
        } else {
            post.votos.push(req.user.id)
        }
        post.num_votos = post.votos.length
        await post.save()        

        return res.send({ 'status': 'success', 'post': post.toJSON() })
    }
}

module.exports = new PostController()
