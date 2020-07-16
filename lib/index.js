const _ = require('lodash');
const moment = require('moment');
const API = require('call-of-duty-api')({ platform: "psn" });

const { gamertag, email, password } = require('../config.json');

API.login(email, password)
    .then(() => {
        API.MWcombatwz (gamertag).then(data => {            
            const brMatches = _.filter(data.matches, (game) => game.mode.startsWith('br'));
            const x = _.map(brMatches, (game => {
                return {
                    date: moment(game.utcStartSeconds).format(),
                    kdRatio: game.playerStats.kdRatio
                }
            }));
            console.log("Data", x);  // see output
        });
    })
    .catch(console.log);