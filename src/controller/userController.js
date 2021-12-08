const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken');


class UserController {
    async createUser( req, res ) {
        console.log(req.body)
        let user = await userModel.create( req.body )
        
        user.senha = undefined

        let token = jwt.sign( JSON.stringify(user), 'privateKey');

        return res.status(201).send( { 'status': 'success', user, 'token': token } )
    }

    async deleteUser( req, res ) {
        userModel.destroy( {where: { id: req.params.id } } )
        return res.send( { 'status': 'success', "message": "User deleted successfully!" } )
    }

    async editUser( req, res ) {
        let user = await userModel.update(
            req.body,
            { where: { id: req.params.id } }
        )
        user = await userModel.findOne({where: {id: req.params.id }})
        user.senha = undefined
        return res.status(201).send( { 'status': 'success', 'user': user } )
        
    }

    async login( req, res ) {   
        let user = await userModel.findOne({ 
            where: {
                email: req.body.email, senha: req.body.senha
            }
        })

        if ( user === null ) {
            return res.status(400).send({'status': 'success', 'message': "User not found" })
        }

        user.senha = undefined
        
        let token = jwt.sign(JSON.stringify(user), 'privateKey');
        
        return res.send({'status': 'success', 'token': token })
    }

    async getUser( req, res ) {
        let user = await userModel.findOne({ 
            where: {
                id: req.params.id
            }
        })
        
        if ( user === null ) {
            return res.status(400).send({'status': 'fail', 'message': "User not found" })
        }

        user.senha = undefined

        return res.status(201).send({'status': 'success', user })
    }
}

module.exports = new UserController()