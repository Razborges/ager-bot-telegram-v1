// const Api = require('../api');
const Messages = require('./messages');
// const Menus = require('./menus');

exports.commandNovaRota = (msg, reply) => {
  const nameUser = `@${msg.from.username}`;

  reply.keyboard().markdown(Messages.nova_rota.lesson(nameUser));
  reply.markdown(Messages.nova_rota.example);
  reply.markdown(Messages.nova_rota.go);

  msg.context.nova_rota = true;
};
