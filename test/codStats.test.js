const MWcombatwz = require('./samples/MWcombatwz.json');

const codStats = require('../lib/codStats.js');

describe('call of duty stats', () => {
  const stats = codStats(MWcombatwz);

  test('calculates the total kills', () => {
    expect(stats['2020-07-15'].totalKills).toBe(26);
    expect(stats['2020-07-16'].totalKills).toBe(26);
    expect(stats['2020-07-17'].totalKills).toBe(10);
  });

  test('calculates the total deaths', () => {
    expect(stats['2020-07-15'].totalDeaths).toBe(18);
    expect(stats['2020-07-16'].totalDeaths).toBe(17);
    expect(stats['2020-07-17'].totalDeaths).toBe(3);
  });

  test('calculates the kill/death ratio rating', () => {
    expect(stats['2020-07-15'].kdRatio).toBe(1.44);
    expect(stats['2020-07-16'].kdRatio).toBe(1.53);
    expect(stats['2020-07-17'].kdRatio).toBe(3.33);
  });

  test('calculates the number of matches of a given day', () => {
    expect(stats['2020-07-15'].numberOfMatches).toBe(9);
    expect(stats['2020-07-16'].numberOfMatches).toBe(9);
    expect(stats['2020-07-17'].numberOfMatches).toBe(2);
  });

  test('extract game information', () => {
    const game = stats['2020-07-17'].matches[0];
    expect(game).toEqual({
      teamPlacement: 8,
      date: '2020-07-17T00:40:50-03:00',
      mode: "br_brquads",
      kills: 2,
      deaths: 1,
      kdRatio: 2,
    });
  });
});
