const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const livreRoutes = require('./routes/livreRoutes');
const membreRoutes = require('./routes/membreRoutes');
const empruntRoutes = require('./routes/empruntRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://latsara04:o563bC8NgxgWOgut@cluster0.caffh.mongodb.net/nom_de_ta_base_de_données?retryWrites=true&w=majority')
.then(() => console.log("Connecté à MongoDB"))
.catch(err => console.error("Erreur de connexion :", err));

// Routes
app.use('/api/livres', livreRoutes);
app.use('/api/membres', membreRoutes);
app.use('/api/emprunts', empruntRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
