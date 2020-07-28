const _ = require('lodash');
const moment = require('moment');

module.exports = (data) => {
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
    const dayMatch = matches[day] ? matches[day] : {
      totalKills: 0,
      totalDeaths: 0,
      numberOfMatches: 0,
      matches: [],
    };
    const kills = dayMatch.totalKills + game.playerStats.kills;
    const deaths = dayMatch.totalDeaths + game.playerStats.deaths;
    const nr = dayMatch.numberOfMatches + 1;
    dayMatch.matches.push(x);

    matches[day] = {
      totalKills: kills,
      totalDeaths: deaths,
      numberOfMatches: nr,
      kdRatio: (kills / deaths),
      matches: dayMatch.matches,
    };
    return matches;
  }, {});
  return dailyData;
};