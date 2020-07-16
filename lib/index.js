const _ = require('lodash');
const fs = require('fs');
const moment = require('moment');
const API = require('call-of-duty-api')({ platform: "psn" });

const { gamertag, email, password } = require('../config.json');

API.login(email, password)
    .then(() => {

        API.MWcombatwz (gamertag).then(data => {
            
            const x = _.filter(data.matches, (game) => game.mode.startsWith('br'));
            //fs.writeFileSync('result.json', JSON.stringify(data))
            console.log("Data", x);  // see output
        }).catch(err => {
            console.log(err);
        });

    }


    ).catch(console.log);


