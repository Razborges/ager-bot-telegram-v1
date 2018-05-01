require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;

require('./src/bot')(token);
