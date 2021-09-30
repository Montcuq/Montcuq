const {default: axios} = require("axios");
const unirest = require("unirest");

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
        "x-rapidapi-key": "97589ae7e7mshdeada20f7a97498p18f235jsnf26b668863d4", //17e6b30ac5mshfc777e023578735p122442jsnef128f722a51
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
