const express = require('express');
const Emprunt = require('../models/emprunt');

const router = express.Router();

// Créer un emprunt
router.post('/', (req, res) => {
    const { livreId, membreId, dateRetour } = req.body;

    if (!livreId || !membreId) {
        return res.status(400).send("Livre et membre sont requis !");
    }

    const nouvelEmprunt = new Emprunt({ livreId, membreId, dateRetour });

    nouvelEmprunt.save()
        .then(() => res.status(201).send("Emprunt enregistré avec succès !"))
        .catch(err => res.status(500).send("Erreur lors de l'enregistrement : " + err.message));
});

// Lire tous les emprunts
router.get('/', (req, res) => {
    Emprunt.find()
        .populate('livreId')
        .populate('membreId')
        .then(emprunts => res.json(emprunts))
        .catch(err => res.status(500).send("Erreur lors de la récupération des emprunts : " + err.message));
});

// Mettre à jour un emprunt
router.put('/:id', (req, res) => {
    const { livreId, membreId, dateRetour } = req.body;

    Emprunt.findByIdAndUpdate(req.params.id, { livreId, membreId, dateRetour }, { new: true })
        .then(emprunt => {
            if (!emprunt) return res.status(404).send("Emprunt non trouvé !");
            res.send("Emprunt mis à jour avec succès !");
        })
        .catch(err => res.status(500).send("Erreur lors de la mise à jour : " + err.message));
});

// Supprimer un emprunt
router.delete('/:id', (req, res) => {
    Emprunt.findByIdAndDelete(req.params.id)
        .then(emprunt => {
            if (!emprunt) return res.status(404).send("Emprunt non trouvé !");
            res.send("Emprunt supprimé avec succès !");
        })
        .catch(err => res.status(500).send("Erreur lors de la suppression : " + err.message));
});

module.exports = router;
