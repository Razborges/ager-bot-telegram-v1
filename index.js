require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;
let options;

if (process.env.DEV) {
  options = { polling: true };
} else {
  options = {
    webHook: {
      port: process.env.PORT,
      host: process.env.HOST,
    },
  };
}

require('./src/bot')(token, options);
