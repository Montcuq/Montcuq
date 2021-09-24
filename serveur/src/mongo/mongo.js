const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log(' Connexion à MongoDB:ecarlate réussie !'.green))
    .catch(() => console.log(' Connexion à MongoDB:ecarlate échouée !'.red));
