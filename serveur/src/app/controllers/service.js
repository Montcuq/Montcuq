const {default: axios} = require("axios");
const unirest = require("unirest");

exports.weather = (req, res, next) => {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: req.params.town},
        headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY_WEATHER
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
        "x-rapidapi-key": process.env.API_KEY_TRANSLATE,
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
