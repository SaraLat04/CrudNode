const mongoose = require('mongoose');

const empruntSchema = new mongoose.Schema({
    livreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livre',
        required: true
    },
    membreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membre',
        required: true
    },
    dateEmprunt: {
        type: Date,
        default: Date.now
    },
    dateRetour: {
        type: Date
    }
});

module.exports = mongoose.model('Emprunt', empruntSchema);
