const _ = require('lodash');
const moment = require('moment');
const roundTo = require('round-to');

const match = ({mode, playerStats} , date) => ({
  teamPlacement: playerStats.teamPlacement,
  date: date.format(),
  mode,
  kills: playerStats.kills,
  deaths: playerStats.deaths,
  kdRatio: playerStats.kdRatio,
});

module.exports = (data) => {
  const brMatches = _.filter(data.matches, (game) => game.mode.startsWith('br'));

  /* eslint no-param-reassign: ["error", { "props": false }] */
  return _.reduce(brMatches, (matches, game) => {
    const date = moment(game.utcStartSeconds * 1000);
    const day = date.format('YYYY-MM-DD');
    const dayMatch = matches[day] ? matches[day] : {
      totalKills: 0,
      totalDeaths: 0,
      numberOfMatches: 0,
      matches: [],
    };
    const totalKills = dayMatch.totalKills + game.playerStats.kills;
    const totalDeaths = dayMatch.totalDeaths + game.playerStats.deaths;
    const numberOfMatches = dayMatch.numberOfMatches + 1;
    dayMatch.matches.push(match(game, date));

    matches[day] = {
      totalKills,
      totalDeaths,
      numberOfMatches,
      kdRatio: roundTo(totalKills / totalDeaths, 2),
      matches: dayMatch.matches,
    };
    return matches;
  }, {});
};
