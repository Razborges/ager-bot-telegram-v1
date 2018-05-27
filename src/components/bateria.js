const Api = require('../api');
const Messages = require('./messages');
const { commandStart } = require('./start');

exports.commandBateria = async (msg, reply) => {
  reply.keyboard();

  const user = await Api.getUser(msg.from.id);

  if (!user.data.result) {
    commandStart(msg, reply);
  } else {
    const { numberSeries, name } = user.data.result.robot;
    const battery = await Api.getBattery(numberSeries);

    if (battery.data.battery.length === 0) {
      reply.action('typing').markdown(Messages.bateria.noLevel);
    } else {
      const { level } = battery.data.battery[0];

      if (name) {
        reply.action('typing').markdown(Messages.bateria.levelWithName(level, name));
      } else {
        reply.action('typing').markdown(Messages.bateria.level(name));
      }
    }
  }
};
