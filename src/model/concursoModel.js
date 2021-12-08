const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Concurso = Schema({
    nome: {
        type: String, required: true
    },
    criador: {
        type: Number, required: true
    },
    ganhador: {type: Schema.Types.ObjectId,ref:'Post'},
    posts: [
        {type: Schema.Types.ObjectId,ref:'Post'}
    ],
    tipo: {
        type: String,
        required: true,
        enum : ['A','V', 'I', 'T'],
        maxlength: 1,
        default: 'T'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Concurso", Concurso)