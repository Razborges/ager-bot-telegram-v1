const Api = require('../api');
const Messages = require('./messages');
const Menus = require('./menus');
const { commandStart } = require('./start');

exports.commandNovaRota = async (msg, reply) => {
  const nameUser = `@${msg.from.username}`;

  const user = await Api.getUser(msg.from.id);

  if (!user.data.result) {
    commandStart(msg, reply);
  } else {
    reply.keyboard().markdown(Messages.nova_rota.lesson(nameUser));
    reply.markdown(Messages.nova_rota.example);
    reply.markdown(Messages.nova_rota.go);

    msg.context.nova_rota = true;
  }
};
