require('dotenv').config();
const Api = require('./api');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
// const bot = new TelegramBot(token, { polling: true, webHook: { port: process.env.PORT } });

// bot.setWebHook(`${process.env.URL}:${process.env.PORT}/${token}`);

// Matches "/echo [whatever]"
bot.onText(/\/start/, (info) => {
  const chatId = info.chat.id;
  const name = info.from.username;

  const message = `Olá ${name}! Eu sou o AgerBot, vamos começar?`;
  const user = Api.getUser(info.from.id);

  console.log('USER', user);

  bot.sendMessage(chatId, message);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
