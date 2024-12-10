const mongoose = require('mongoose');

const membreSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateInscription: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Membre', membreSchema);
