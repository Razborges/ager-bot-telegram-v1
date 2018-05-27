const Api = require('../api');
const Messages = require('./messages');
const Menus = require('./menus');

exports.commandAjuda = async (msg, reply) => {
  reply.keyboard();
  const name = `@${msg.from.firstname}`;
  const user = await Api.getUser(msg.from.id);

  reply.action('typing').markdown(Messages.help.help1(name));
  reply.action('typing').markdown(Messages.help.help2);
  reply.action('typing').markdown(Messages.help.help3);

  if (!user.data.result) {
    reply.action('typing').keyboard(Menus.init, true).markdown(Messages.help.helpMenu);
  }

  if (user.data.result) {
    reply.action('typing').keyboard(Menus.complete).markdown(Messages.help.helpMenu);
  }
};
