const express = require('express');
const app = express();
const helmet = require("helmet");
const path = require('path');

module.exports = app;

const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connexion à la  base de données
mongoose.connect('mongodb+srv://WillOCR:AZERTY@hottakesp6.mdcp4qa.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Utilisation d'Express qui permet de créer des sessions pour les utilisateurs et qui est nécessaire pour trouver les routes
// des utilisateurs et des sauces. Il permet aussi de pouvoir gérer les erreurs et d'afficher les messages personnalisés
// en cas de ces dernières.
app.use(express.json());

// Utilisation d'Helmet qui est une extension de Node permettant de sécuriser les requêtes HTML.
app.use(helmet());

// Authorisation et permission à l'utilisateur de récupérer, d'envoyer, d'insérer, de supprimer, de patcher et de rajouter des options
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Lien qui redirige les images des sauces dans le dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Appel des routes user et sauces afin de pouvoir les récupérer
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;