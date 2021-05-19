//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { Temperament, conn } = require('./src/db.js');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  let array = [];

  axios.get("https://api.thedogapi.com/v1/breeds")
    .then((results) => {
      for (let i = 0; i < results.data.length; i++) {
        if (results.data[i].temperament) {
          let variables = results.data[i].temperament.split(', ')
          for (let j = 0; j < variables.length; j++) {
            if (!array.includes(variables[j])) {
              array.push(variables[j])
              Temperament.create({ name: variables[j], id: uuidv4() })
            }
          }
        }
      }
    })
    .catch(error => console.log(error))

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
