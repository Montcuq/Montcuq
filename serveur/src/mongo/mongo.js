const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:Montcuq@mongodb:27017',    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(' Connexion à MongoDB:ecarlate réussie !'.green))
    .catch((e) => console.log(e));
    // .catch(() => console.log(' Connexion à MongoDB:ecarlate échouée !'.red));
