const Api = require('../api');
const Messages = require('./messages');
const { commandStart } = require('./start');

exports.commandNovaRota = async (msg, reply) => {
  const nameUser = `@${msg.from.firstname}`;

  const user = await Api.getUser(msg.from.id);

  if (!user.data.result) {
    commandStart(msg, reply);
  } else {
    reply.action('typing').keyboard().markdown(Messages.nova_rota.lesson(nameUser));
    reply.action('typing').keyboard().markdown(Messages.nova_rota.example);
    reply.action('typing').keyboard().markdown(Messages.nova_rota.go);

    msg.context.nova_rota = true;
  }
};
