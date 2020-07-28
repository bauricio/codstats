const API = require('call-of-duty-api')({ platform: 'psn' });

const { gamertag, email, password } = require('../config.json');
const codStats = require('./codStats');

API.login(email, password)
  .then(() => {
    API.MWcombatwz(gamertag).then((data) => {
      const dailyData = codStats(data);
      console.log('Data', JSON.stringify(dailyData, null, 2));
    });
  })
  .catch(console.log);
