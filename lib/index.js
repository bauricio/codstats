const _ = require('lodash');
const moment = require('moment');
const API = require('call-of-duty-api')({ platform: 'psn' });

const { gamertag, email, password } = require('../config.json');

API.login(email, password)
  .then(() => {
    API.MWcombatwz(gamertag).then((data) => {
      const brMatches = _.filter(data.matches, (game) => game.mode.startsWith('br'));

      /* eslint no-param-reassign: ["error", { "props": false }] */
      const dailyData = _.reduce(brMatches, (matches, game) => {
        const date = moment(game.utcStartSeconds * 1000);
        const day = date.format('YYYY-MM-DD');
        const x = {
          date: date.format(),
          kills: game.playerStats.kills,
          deaths: game.playerStats.deaths,
          kdRatio: game.playerStats.kdRatio,
        };
        const dayMatches = matches[day] ? matches[day] : {
          totalKills: 0,
          totalDeaths: 0,
          numberOfMatches: 0,
          matches: [],
        };
        const kills = dayMatches.totalKills + game.playerStats.kills;
        const deaths = dayMatches.totalDeaths + game.playerStats.deaths;
        const nr = dayMatches.numberOfMatches + 1;
        dayMatches.matches.push(x);
        matches[day] = {
          totalKills: kills,
          totalDeaths: deaths,
          numberOfMatches: nr,
          kdRatio: (kills / deaths),
          matches: dayMatches.matches,
        };

        const matchHour = date.hours();
        const initialRange = matchHour >= 18 && matchHour <= 23
          ? moment(game.utcStartSeconds * 1000).hours(18).minutes(0).seconds(0)
          : moment(game.utcStartSeconds * 1000).subtract(1, 'days').hours(18).minutes(0)
            .seconds(0);
        const endRange = matchHour >= 0 && matchHour <= 6
          ? moment(game.utcStartSeconds * 1000).hours(6).minutes(0).seconds(0)
          : moment(game.utcStartSeconds * 1000).add(1, 'days').hours(6).minutes(0)
            .seconds(0);
        if (date.isAfter(initialRange) && date.isBefore(endRange)) {
          const session = `${initialRange.format('YYYY-MM-DD HH:mm:ss')} - ${endRange.format('YYYY-MM-DD HH:mm:ss')}`;
          const y = {
            date: session,
            kills: game.playerStats.kills,
            deaths: game.playerStats.deaths,
            kdRatio: game.playerStats.kdRatio,
          };
          const sessionMatches = matches[session] ? matches[session] : {
            totalKills: 0,
            totalDeaths: 0,
            numberOfMatches: 0,
            matches: [],
          };
          const killsSession = sessionMatches.totalKills + game.playerStats.kills;
          const deathsSession = sessionMatches.totalDeaths + game.playerStats.deaths;
          const nrSession = sessionMatches.numberOfMatches + 1;
          sessionMatches.matches.push(y);
          matches[session] = {
            totalKills: killsSession,
            totalDeaths: deathsSession,
            numberOfMatches: nrSession,
            kdRatio: (killsSession / deathsSession),
            matches: sessionMatches.matches,
          };
        }
        return matches;
      }, {});
      console.log('Data', dailyData);
    });
  })
  .catch(console.log);
