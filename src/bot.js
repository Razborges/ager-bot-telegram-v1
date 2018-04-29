require('dotenv').config();
// const Api = require('./api');
// const User = require('./models/User');
// const Start = require('./commands/start');
// const Register = require('./commands/register');
// const TelegramBot = require('node-telegram-bot-api');
const botgram = require('botgram');

module.exports = (token) => { // , options) =>
  const bot = botgram(token);

  bot.command('start', (msg, reply) => {
    reply.text('Ciao sono il photo bot manda le foto da archiviare..');
  });
  // // DEFININDO BOT
  // const bot = new TelegramBot(token, options);
  // bot.setWebHook(`${process.env.URL}:${process.env.PORT}/bot${token}`);

  // // COMMAND /start
  // bot.onText(/\/start (.+)/, async (info) => {
  //   const chatId = info.chat.id;
  //   const name = `@${info.from.username}`;
  //   const user = await Api.getUser(info.from.id);

  //   if (!user.data.result) {
  //     await bot.sendMessage(chatId, Start.message.welcome(name), Start.default);
  //     await bot.sendMessage(chatId, Start.message.explain, Start.default);
  //     await bot.sendMessage(chatId, Start.message.initOptions, Start.init);
  //   }

  //   if (user.data.result) {
  //     await bot.sendMessage(chatId, Start.message.return(name), Start.default);
  //     await bot.sendMessage(chatId, Start.message.commands, Start.complete);
  //   }
  // });

  // // REGISTER A AGER
  // bot.onText(/Registrar um AGER/, async (info) => {
  //   const chatId = info.chat.id;
  //   const name = `${info.from.first_name} ${info.from.last_name}`;
  //   const service = 'telegram';
  //   const serviceId = info.from.id;

  //   await bot.sendMessage(chatId, Register.message.info, Start.default);
  //   await bot.sendMessage(chatId, Register.message.digit, Start.default);

  //   bot.on('message', async (numberMsg) => {
  //   // VERIFICAR NUMERO DE SÉRIE E EMAIL
  //     let [numberSeries, email] = numberMsg.text.toString().split('-');

  //     numberSeries = numberSeries.trim();
  //     email = email.trim();

  //     if (numberSeries && email) {
  //       const user = new User(name, email, service, serviceId);
  //       const result = await Api.addUser(numberSeries, user);

  //       if (!result.error) {
  //         await bot.sendMessage(chatId, Register.message.success, Start.default);
  //         await bot.sendMessage(chatId, Register.message.newRoute, Register.newRoute);
  //       }

  //       if (result.error) {
  //         await bot.sendMessage(chatId, Register.message.errorNumberSeries, Start.default);
  //         await bot.sendMessage(chatId, Register.message.errorMenu, Start.init);
  //       }
  //     } else {
  //       bot.sendMessage(chatId, Register.message.errorEmail, Start.init);
  //     }
  //   });
  // });

  return bot;
};
