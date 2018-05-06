const Api = require('../api');
const Messages = require('./messages');
const Menus = require('./menus');

exports.commandStart = async (msg, reply) => {
  reply.keyboard();
  const name = `@${msg.from.username}`;
  const user = await Api.getUser(msg.from.id);

  if (!user.data.result) {
    reply.keyboard().markdown(Messages.start.welcome(name));
    reply.markdown(Messages.start.explain);
    reply.keyboard(Menus.init, true).markdown(Messages.start.initOptions);
  }

  if (user.data.result) {
    reply.keyboard().markdown(Messages.start.return(name));
    reply.keyboard(Menus.complete).markdown(Messages.start.commands);
  }
};