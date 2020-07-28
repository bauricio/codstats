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

  test('calculates the kill/death ratio rounding', () => {
    expect(stats['2020-07-15'].kdRatio).toBe(1.44);
    expect(stats['2020-07-16'].kdRatio).toBe(1.53);
    expect(stats['2020-07-17'].kdRatio).toBe(3.33);
  });
});
