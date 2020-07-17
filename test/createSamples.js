const fs = require('fs');
const API = require('call-of-duty-api')({ platform: "psn" });

const { gamertag, email, password } = require('../config.json');

API.login(email, password)
    .then(() => {
        API.MWcombatwz(gamertag).then(data => {
            fs.writeFileSync('test/samples/MWcombatwz.json', JSON.stringify(data, null, 4));
        });

        API.MWwzstats(gamertag).then(data => {
            fs.writeFileSync('test/samples/MWwzstats.json', JSON.stringify(data, null, 4));
        });

        API.MWWzfriends(gamertag).then(data => {
            fs.writeFileSync('test/samples/MWwzfriends.json', JSON.stringify(data, null, 4));
        });

        API.MWfullcombatwz(gamertag).then(data => {
            fs.writeFileSync('test/samples/MWfullcombatwz.json', JSON.stringify(data, null, 4));
        });

        API.MWwz(gamertag).then(data => {
            fs.writeFileSync('test/samples/MWwz.json', JSON.stringify(data, null, 4));
        });
    });