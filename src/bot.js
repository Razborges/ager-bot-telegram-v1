require('dotenv').config();
const Api = require('./api');
const User = require('./models/User');
const Route = require('./models/Route');
const Start = require('./commands/start');
const Register = require('./commands/register');
const NovaRota = require('./commands/nova_rota');
const botgram = require('botgram');

module.exports = (token) => { // , options) =>
  const bot = botgram(token);
  bot.context({
    register: false, email: false, numberSeries: false, nova_rota: false,
  });
  let numberSeries = '';
  let email = '';

  bot.command('start', async (msg, reply) => {
    reply.keyboard();
    const name = `@${msg.from.username}`;
    const user = await Api.getUser(msg.from.id);

    if (!user.data.result) {
      reply.keyboard().markdown(Start.message.welcome(name));
      reply.markdown(Start.message.explain);
      reply.keyboard(Start.menu.init, true).markdown(Start.message.initOptions);
    }

    if (user.data.result) {
      reply.keyboard().markdown(Start.message.return(name));
      reply.keyboard(Start.menu.complete).markdown(Start.message.commands);
    }
  });

  bot.command('nova_rota', (msg, reply) => {
    const nameUser = `@${msg.from.username}`;
    reply.keyboard().markdown(NovaRota.message.lesson(nameUser));
    reply.markdown(NovaRota.message.example);
    reply.markdown(NovaRota.message.go);
    msg.context.nova_rota = true;
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

    if (msg.context.nova_rota) {
      const user = await Api.getUser(msg.from.id);
      const number = user.data.result.robot.numberSeries;

      let [nameRoute, type, start] = msg.text.split('-');
      nameRoute = name.trim();
      type = type.trim();
      start = start ? start.trim() : null;

      const route = new Route(nameRoute, type, start);

      const result = await Api.addRoute(number, route);

      if (!result.error) {
        msg.context.nova_rota = false;
        reply.keyboard(Start.menu.complete).markdown(NovaRota.message.success);
      }

      if (result.error) {
        msg.context.nova_rota = false;
        reply.markdown(NovaRota.message.error);
        reply.keyboard(Register.menu.newRoute).markdown(NovaRota.message.again);
      }
    }

    if (text === 'saber mais sobre o ager') {
      reply.keyboard().markdown('CRIAR MENSAGEM');
      reply.keyboard(Start.menu.init).markdown(Start.message.initOptions);
    }

    if (text === 'xau' || text === 'adeus' || text === 'fui' || text === 'quit') {
      reply.keyboard().markdown('Foi um prazer ajudar, até mais :)');
    }
  });

  return bot;
};
