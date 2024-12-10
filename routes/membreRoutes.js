const express = require('express');
const Membre = require('../models/membre');

const router = express.Router();

// Créer un membre
router.post('/', (req, res) => {
    const { nom, email } = req.body;

    if (!nom || !email) {
        return res.status(400).send("Tous les champs sont requis !");
    }

    const nouveauMembre = new Membre({ nom, email });

    nouveauMembre.save()
        .then(() => res.status(201).send("Membre enregistré avec succès !"))
        .catch(err => res.status(500).send("Erreur lors de l'enregistrement : " + err.message));
});

// Lire tous les membres
router.get('/', (req, res) => {
    Membre.find()
        .then(membres => res.json(membres))
        .catch(err => res.status(500).send("Erreur lors de la récupération des membres : " + err.message));
});

// Mettre à jour un membre
router.put('/:id', (req, res) => {
    const { nom, email } = req.body;

    Membre.findByIdAndUpdate(req.params.id, { nom, email }, { new: true })
        .then(membre => {
            if (!membre) return res.status(404).send("Membre non trouvé !");
            res.send("Membre mis à jour avec succès !");
        })
        .catch(err => res.status(500).send("Erreur lors de la mise à jour : " + err.message));
});

// Supprimer un membre
router.delete('/:id', (req, res) => {
    Membre.findByIdAndDelete(req.params.id)
        .then(membre => {
            if (!membre) return res.status(404).send("Membre non trouvé !");
            res.send("Membre supprimé avec succès !");
        })
        .catch(err => res.status(500).send("Erreur lors de la suppression : " + err.message));
});

module.exports = router;
