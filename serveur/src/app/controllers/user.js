const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const axios = require("axios").default;
var unirest = require("unirest");

exports.signup = (req, res, next) => {
    if (!validateEmail(req.body.email)) {
        res.status(400).json({error: 'Email non conforme'});
    } else {
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
    }
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
                    res.status(201).json({
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

exports.weather = (req, res, next) => {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: req.params.town},
        headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': '6fcecb118cmsh05c8cedbd2f73fdp138f6bjsn9358185ccc18'
        }
    };

    axios.request(options).then(function (response) {
        res.status(201).json(response.data);
    }).catch(function (error) {
        console.error(error);
    });
};

exports.translate = (req, res, next) => {
    const request = unirest("POST", "https://deep-translate1.p.rapidapi.com/language/translate/v2");

    request.headers({
        "content-type": "application/json",
        "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
        "x-rapidapi-key": "97589ae7e7mshdeada20f7a97498p18f235jsnf26b668863d4",
        "useQueryString": true
    });

    request.type("json");
    request.send({
        "q": req.body.message,
        "source": req.body.source,
        "target": req.body.target
    });

    request.end(function (result) {
        if (result.error)
            throw new Error(result.error);

        console.log(result.body.data.translations.translatedText);
        res.status(201).json(result.body.data.translations.translatedText);
    });
};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
