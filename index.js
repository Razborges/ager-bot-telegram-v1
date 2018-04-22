require('dotenv').config();
const Api = require('./api');
const User = require('./models/User');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
let bot = '';

if (process.env.DEV) {
  bot = new TelegramBot(token, { polling: true });
} else {
  bot = new TelegramBot(token, { polling: true, webHook: { port: process.env.PORT } });
  bot.setWebHook(`${process.env.URL}:${process.env.PORT}/${token}`);
}

// COMMAND /start
bot.onText(/\/start/, async (info) => {
  const chatId = info.chat.id;
  const name = `@${info.from.username}`;
  const user = await Api.getUser(info.from.id);

  if (!user.data.result) {
    const message1 = `Olá ${name}! Eu sou o *AgerBot*. Eu irei te auxiliar durante a nossa conversa.`;

    const message2 = 'Vi que você é um usuário que ainda não possui um *AGER*. O *AGER* é um robô agrícola, e eu posso lhe ajudar a verificar algumas informações coletadas por ele.';

    await bot.sendMessage(chatId, message1, { parse_mode: 'markdown' });
    await bot.sendMessage(chatId, message2, { parse_mode: 'markdown' });

    await bot.sendMessage(chatId, 'Vamos começar? Escollha uma das opções abaixo:', {
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [['Registrar um AGER'], ['Saber mais sobre o AGER']],
      },
    });
  }

  if (user.data.result) {
    const message3 = `${name} estou pronto para lhe ajudar novamente!`;
    const message4 = 'Escolha uma das opções do menu, e não se esqueça: a qualquer momento você pode utilizar nossos comandos especiais: `/start`';

    await bot.sendMessage(chatId, message3, { parse_mode: 'markdown' });
    await bot.sendMessage(chatId, message4, {
      parse_mode: 'markdown',
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [['Ver minhas rotas'], ['Verificar temperaturas'], ['Verificar humidade'], ['Nível da bateria']],
      },
    });
  }
});

// REGISTER A AGER
bot.onText(/Registrar um AGER/, async (info) => {
  const chatId = info.chat.id;
  const name = `${info.from.first_name} ${info.from.last_name}`;
  const service = 'telegram';
  const serviceId = info.from.id;

  bot.on('contact', async (phone) => { console.log(phone); });

  await bot.sendMessage(chatId, 'Para registrar um *AGER* você deve nos informar o número de série e seu e-mail separados por hífen. Exemplo: _12345abc - seu@email.com_', {
    parse_mode: 'markdown',
    reply_markup: {
      remove_keyboard: true,
    },
  });
  await bot.sendMessage(chatId, 'Está pronto? Digite agora:', {
    parse_mode: 'markdown',
  });

  bot.on('message', async (numberMsg) => {
    const [numberSeries, email] = numberMsg.text.toString().split(' - ');

    if (numberSeries && email) {
      const user = new User(name, email, service, serviceId);
      const result = await Api.addUser(numberSeries, user);

      console.log('RESULT', result);
    } else {
      bot.sendMessage(chatId, 'As informações não estão corretas, tente novamente.', {
        parse_mode: 'markdown',
        reply_markup: {
          one_time_keyboard: true,
          keyboard: [['Registrar um AGER'], ['Saber mais sobre o AGER']],
        },
      });
    }
  });
});
