const express = require('express');
const Livre = require('../models/livre');

const router = express.Router();

// Créer un livre
router.post('/', (req, res) => {
    const { titre, auteur, annéePublication } = req.body;

    if (!titre || !auteur || !annéePublication) {
        return res.status(400).send("Tous les champs sont requis !");
    }

    const nouveauLivre = new Livre({ titre, auteur, annéePublication });

    nouveauLivre.save()
        .then(() => res.status(201).send("Livre enregistré avec succès !"))
        .catch(err => res.status(500).send("Erreur lors de l'enregistrement : " + err.message));
});

// Lire tous les livres
router.get('/', (req, res) => {
    Livre.find()
        .then(livres => res.json(livres))
        .catch(err => res.status(500).send("Erreur lors de la récupération des livres : " + err.message));
});

// Mettre à jour un livre
router.put('/:id', (req, res) => {
    const { titre, auteur, annéePublication } = req.body;

    Livre.findByIdAndUpdate(req.params.id, { titre, auteur, annéePublication }, { new: true })
        .then(livre => {
            if (!livre) return res.status(404).send("Livre non trouvé !");
            res.send("Livre mis à jour avec succès !");
        })
        .catch(err => res.status(500).send("Erreur lors de la mise à jour : " + err.message));
});

// Supprimer un livre
router.delete('/:id', (req, res) => {
    Livre.findByIdAndDelete(req.params.id)
        .then(livre => {
            if (!livre) return res.status(404).send("Livre non trouvé !");
            res.send("Livre supprimé avec succès !");
        })
        .catch(err => res.status(500).send("Erreur lors de la suppression : " + err.message));
});

module.exports = router;
