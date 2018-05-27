require('dotenv').config();
const Api = require('../api');
const Messages = require('./messages');
const { commandStart } = require('./start');
const Menus = require('./menus');
const moment = require('moment');
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
const path = require('path');

exports.commandHistoricoDados = async (msg, reply) => {
  const user = await Api.getUser(msg.from.id);
  const { numberSeries } = user.data.result.robot;
  const routes = await Api.getRoute(numberSeries);
  const count = routes.data.routes.length;
  const fields = ['rota', 'data', 'temperatura', 'humidade do ar'];
  const json2csvParser = new Json2csvParser({ fields });

  if (!user.data.result) {
    commandStart(msg, reply);
  } else if (count === 0) {
    reply.action('typing').keyboard(Menus.complete).markdown(Messages.default.noRoute);
  } else {
    reply.action('typing').keyboard(Menus.complete).markdown(Messages.historico.default);
    const data = [];
    routes.data.routes.map(async (route) => {
      const work = await Api.getWork(route.id);

      await work.data.works.map((w) => {
        const { temperature, humidity, endWork } = w;
        const date = moment(endWork).format('DD/MM/YYYY');

        const info = {
          rota: route.name,
          data: date,
          temperatura: temperature,
          'humidade do ar': humidity,
        };
        return data.push(info);
      });

      const csv = json2csvParser.parse(data);

      fs.writeFile(`./files/${user.data.result.id}.csv`, csv, (err) => {
        if (err) {
          reply.action('typing').keyboard(Menus.complete).markdown(Messages.historico.errorFile);
        }
        reply.action('typing').keyboard(Menus.complete).markdown(Messages.historico.send).document(path.join(`${__dirname}../../../files/${user.data.result.id}.csv`));
      });
    });
  }
};
