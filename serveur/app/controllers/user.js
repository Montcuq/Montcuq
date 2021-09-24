const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => {
                    res.status(201).json({message: 'Utilisateur créé !'});
                    console.log(user.pseudo + " créé ! ")
                })
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    const errorMessage = 'Utilisateur ou mot de passe incorrect';
    User.findOne({pseudo: req.body.pseudo})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: errorMessage});
            }
            // Si ici, alors utilisateur trouvé, donc on compare le mot de passe
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid)
                        return res.status(401).json({error: errorMessage});

                    res.status(200).json({
                        userId: user._id,
                        pseudo: user.pseudo,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )

                    });
                })
                .catch(error => res.status(500).json({error}));

        })
        .catch(error => res.status(500).json({error}));
};

exports.getUserPeudoById = (req, res, next) => {
    User.findOne({_id: req.params.id})
        .then(user => res.status(200).json(user.pseudo))
        .catch(error => res.status(404).json({error}));
};
