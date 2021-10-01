const mongoose = require('mongoose');

mongoose.connect('mongodb//172.27.0.3:27017/test',
    { useNewUrlParser: true,
        useUnifiedTopology: true,
        user: 'root',
        pass: 'example'})
    .then(() => console.log(' Connexion à MongoDB:ecarlate réussie !'.green))
    .catch((e) => console.log(e));
//    .catch(() => console.log(' Connexion à MongoDB:ecarlate échouée !'.red));
