require('dotenv').config();
const Api = require('./api');
const User = require('./models/User');
const Start = require('./commands/start');
const Register = require('./commands/register');
const botgram = require('botgram');

module.exports = (token) => { // , options) =>
  const bot = botgram(token);
  bot.context({ register: false, email: false, numberSeries: false });
  let numberSeries = '';
  let email = '';

  bot.command('start', async (msg, reply) => {
    const name = `@${msg.from.username}`;
    const user = await Api.getUser(msg.from.id);

    if (!user.data.result) {
      reply.keyboard().markdown(Start.message.welcome(name));
      reply.text(Start.message.explain, 'Markdown');
      reply.keyboard(Start.menu.init, true).markdown(Start.message.initOptions);
    }

    if (user.data.result) {
      reply.keyboard().markdown(Start.message.return(name));
      reply.keyboard(Start.menu.complete).markdown(Start.message.commands);
    }
  });

  bot.message(async (msg, reply) => {
    const text = msg.text.toLowerCase();

    const name = `${msg.from.firstname} ${msg.from.lastname}`;
    const service = 'telegram';
    const serviceId = msg.from.id;

    if (text === 'registrar um ager') {
      reply.keyboard().markdown(Register.message.digitNumber);
      msg.context.register = true;
      msg.context.numberSeries = true;
    }

    if (text !== 'registrar um ager' && msg.context.register && msg.context.numberSeries) {
      numberSeries = text.toString().trim();
      reply.keyboard().markdown(Register.message.digitEmail);
      msg.context.numberSeries = false;
      msg.context.email = true;
    }

    if (text !== numberSeries && msg.context.register && msg.context.email) {
      email = text.toString().trim();

      msg.context.register = false;
      msg.context.email = false;

      if (numberSeries && email) {
        const user = new User(name, email, service, serviceId);
        const result = await Api.addUser(numberSeries, user);

        if (!result.error) {
          reply.markdown(Register.message.success);
          reply.keyboard(Register.menu.newRoute).markdown(Register.message.newRoute);
        }

        if (result.error) {
          reply.markdown(Register.message.errorNumberSeries);
          reply.keyboard(Start.menu.init).markdown(Register.message.errorMenu);
        }
      } else {
        reply.keyboard(Start.menu.init).markdown(Register.message.errorEmail);
      }
    }

    if (text === 'saber mais sobre o ager') {
      reply.keyboard().markdown('CRIAR MENSAGEM');
      reply.keyboard(Start.menu.init, true).markdown(Start.message.initOptions);
    }

    if (text === 'xau' || text === 'adeus' || text === 'fui' || text === 'quit') {
      reply.keyboard().markdown('Foi um prazer ajudar, até mais :)');
    }
  });

  return bot;
};
