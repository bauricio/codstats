const _ = require('lodash');
const moment = require('moment');
const roundTo = require('round-to');

const individualMatch = ({ mode, playerStats }, date) => ({
  teamPlacement: playerStats.teamPlacement,
  date: date.format(),
  mode,
  kills: playerStats.kills,
  deaths: playerStats.deaths,
  kdRatio: playerStats.kdRatio,
});

const dailyMatchStats = (matchStats) => matchStats || {
  totalKills: 0,
  totalDeaths: 0,
  numberOfMatches: 0,
  matches: [],
};

const dailyMatches = ({ matches }, game, date) => [...matches, individualMatch(game, date)];


/* eslint no-param-reassign: ["error", { "props": false }] */
module.exports = (data) => {
  const brMatches = _.filter(data.matches, (game) => game.mode.startsWith('br'));

  return _.reduce(brMatches, (matchesStats, game) => {
    const date = moment(game.utcStartSeconds * 1000);
    const day = date.format('YYYY-MM-DD');

    const dayMatch = dailyMatchStats(matchesStats[day]);
    const matches = dailyMatches(dayMatch, game, date);

    const totalKills = dayMatch.totalKills + game.playerStats.kills;
    const totalDeaths = dayMatch.totalDeaths + game.playerStats.deaths;
    const numberOfMatches = dayMatch.numberOfMatches + 1;

    matchesStats[day] = {
      totalKills,
      totalDeaths,
      numberOfMatches,
      kdRatio: roundTo(totalKills / totalDeaths, 2),
      matches,
    };
    return matchesStats;
  }, {});
};
