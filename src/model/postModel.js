const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = Schema({
    descricao: {
        type: String, required: true
    },
    autor: {type: Number, required: true},
    texto: {
        type: String, required: false
    },
    arquivo: {
        type: String, require: false
    },
    votos: [{
        type: Number
    }],
    num_votos: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", Post)