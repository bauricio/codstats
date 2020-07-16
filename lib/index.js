const _ = require('lodash');
const moment = require('moment');
const API = require('call-of-duty-api')({ platform: "psn" });

const { gamertag, email, password } = require('../config.json');

API.login(email, password)
    .then(() => {
        API.MWcombatwz (gamertag).then(data => {            
            const brMatches = _.filter(data.matches, (game) => game.mode.startsWith('br'));
            const dailyData = _.reduce(brMatches, (matches, game) => {
                const date = moment(game.utcStartSeconds * 1000);
                const day = date.format("YYYY-MM-DD")
                const x = {
                    date: date.format(),
                    kdRatio: game.playerStats.kdRatio
                }
                let dayMatch = matches[day] ? matches[day] : {
                    totalKills: 0,
                    totalDeaths: 0,
                    numberOfMatches: 0
                };
                const kills = dayMatch.totalKills + game.playerStats.kills;
                const deaths = dayMatch.totalDeaths + game.playerStats.deaths;
                const nr = dayMatch.numberOfMatches + 1;
                matches[day] = {
                    totalKills: kills,
                    totalDeaths: deaths,
                    numberOfMatches: nr,
                    kdRatio: (kills/deaths)
                    

                   // matches: matches[day].matches ? matches[day].matches.push(x) : [x]
                }
                return matches;
            }, {});            
            console.log("Data", dailyData);  // see output
        });
    })
    .catch(console.log);