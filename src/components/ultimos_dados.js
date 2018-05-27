const Api = require('../api');
const Messages = require('./messages');
const { commandStart } = require('./start');
const Menus = require('./menus');
const moment = require('moment');

exports.commandUltimosDados = async (msg, reply) => {
  const user = await Api.getUser(msg.from.id);
  const { numberSeries } = user.data.result.robot;
  const routes = await Api.getRoute(numberSeries);
  const count = routes.data.routes.length;

  if (!user.data.result) {
    commandStart(msg, reply);
  } else if (count === 0) {
    reply.action('typing').keyboard(Menus.complete).markdown(Messages.default.noRoute);
  } else {
    routes.data.routes.map(async (route) => {
      const work = await Api.getWork(route.id);

      if (work.data.works.length === 0) {
        reply.action('typing').keyboard(Menus.complete).markdown(Messages.default.noWork(route));
      } else {
        const { temperature, humidity, endWork } = work.data.works[0];
        const date = moment(endWork).format('DD/MM/YYYY');

        reply
          .action('typing')
          .keyboard(Menus.complete)
          .markdown(Messages.ultimos_dados.dataInfo(route, temperature, humidity, date));
      }
    });
  }
};
