require('dotenv').config();
const Api = require('./api');
const User = require('./models/User');
const Route = require('./models/Route');
const Messages = require('./components/messages');
const Menus = require('./components/menus');
const { commandStart } = require('./components/start');
const { commandNovaRota } = require('./components/nova_rota');
const { commandMenu } = require('./components/menu_command');
const { commandBateria } = require('./components/bateria');
const { commandTemperatura } = require('./components/temperatura');
const { commandHumidade } = require('./components/humidade');

const botgram = require('botgram');

module.exports = (token) => {
  const bot = botgram(token);
  bot.context({
    register: false, email: false, numberSeries: false, nova_rota: false,
  });
  let numberSeries = '';
  let email = '';

  // COMMANDS
  bot.command('start', commandStart);
  bot.command('menu', commandMenu);
  bot.command('nova_rota', commandNovaRota);
  bot.command('bateria', commandBateria);
  bot.command('temperatura', commandTemperatura);
  bot.command('humidade', commandHumidade);

  // VERIFICANDO RETORNO DAS MENSAGENS DO USUÁRIO
  bot.message(async (msg, reply) => {
    const text = msg.text.toLowerCase();

    const name = `${msg.from.firstname} ${msg.from.lastname}`;
    const service = 'telegram';
    const serviceId = msg.from.id;

    // REGISTRANDO UM AGER
    if (text === 'registrar um ager') {
      reply.keyboard().markdown(Messages.register.digitNumber);
      msg.context.register = true;
      msg.context.numberSeries = true;
    }

    if (text !== 'registrar um ager' && msg.context.register && msg.context.numberSeries) {
      numberSeries = text.toString().trim();
      reply.keyboard().markdown(Messages.register.digitEmail);
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
          reply.markdown(Messages.register.success);
          reply.keyboard(Menus.newRoute).markdown(Messages.register.newRoute);
        }

        if (result.error) {
          reply.markdown(Messages.register.errorNumberSeries);
          reply.keyboard(Menus.init).markdown(Messages.register.errorMenu);
        }
      } else {
        reply.keyboard(Menus.init).markdown(Messages.register.errorEmail);
      }
    }

    if (msg.context.nova_rota) {
      const user = await Api.getUser(msg.from.id);
      const number = user.data.result.robot.numberSeries;

      let [nameRoute, type, start] = msg.text.split('-');

      nameRoute = name.trim();
      type = type.trim();
      let route = '';

      if (start) {
        start = start.trim();
        route = new Route(nameRoute, type, start);
      } else {
        start = null;
        route = new Route(nameRoute, type, start);
      }

      const result = await Api.addRoute(number, route);

      if (!result.error) {
        msg.context.nova_rota = false;
        reply.keyboard(Menus.complete).markdown(Messages.nova_rota.success);
      }

      if (result.error) {
        msg.context.nova_rota = false;
        reply.markdown(Messages.nova_rota.error);
        reply.keyboard(Menus.newRoute).markdown(Messages.nova_rota.again);
      }
    }

    // INFORMAÇÕES SOBRE O AGER
    if (text === 'saber mais sobre o ager') {
      reply.keyboard().markdown(Messages.default.ager);
      reply.keyboard(Menus.init).markdown(Messages.start.initOptions);
    }

    // LISTAGEM DE ROTAS
    if (text === 'ver minhas rotas') {
      const user = await Api.getUser(msg.from.id);
      const number = user.data.result.robot.numberSeries;
      const routes = await Api.getRoute(number);
      const count = routes.data.routes.length;

      if (count === 0) {
        reply.keyboard(Menus.complete).markdown(Messages.rotas.noRoutes);
      } else if (count > 1) {
        reply.keyboard().markdown(Messages.rotas.moreRoutes(count));
      } else {
        reply.keyboard().markdown(Messages.rotas.oneRoute(count));
      }

      routes.data.routes.map(route => (
        reply.keyboard(Menus.complete).markdown(Messages.rotas.infoRoute(route))
      ));
    }

    // INFORMAÇÕES SOBRE TEMPERATURA
    if (text === 'verificar temperaturas') {
      commandTemperatura(msg, reply);
    }

    // INFORMAÇÕES SOBRE HUMIDADE
    if (text === 'verificar humidade') {
      commandHumidade(msg, reply);
    }

    // CONSULTAR NÍVEL DA BATERIA
    if (text === 'nível da bateria') {
      commandBateria(msg, reply);
      reply.keyboard(Menus.complete);
    }

    // DESPEDIDA
    if (text === 'xau' || text === 'adeus' || text === 'fui' || text === 'quit') {
      reply.keyboard().markdown(Messages.default.xau);
    }
  });

  return bot;
};
