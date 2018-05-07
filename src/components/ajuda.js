const Api = require('../api');
const Messages = require('./messages');
const Menus = require('./menus');

exports.commandAjuda = async (msg, reply) => {
  reply.keyboard();
  const name = `@${msg.from.username}`;
  const user = await Api.getUser(msg.from.id);

  reply.markdown(Messages.help.help1(name));
  reply.markdown(Messages.help.help2);
  reply.markdown(Messages.help.help3);

  if (!user.data.result) {
    reply.keyboard(Menus.init, true).markdown(Messages.help.helpMenu);
  }

  if (user.data.result) {
    reply.keyboard(Menus.complete).markdown(Messages.help.helpMenu);
  }
};
