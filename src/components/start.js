const Api = require('../api');
const Messages = require('./messages');
const Menus = require('./menus');

exports.commandStart = async (msg, reply) => {
  reply.keyboard();
  const name = `@${msg.from.firstname}`;
  const user = await Api.getUser(msg.from.id);

  if (!user.data.result) {
    reply.action('typing').keyboard().markdown(Messages.start.welcome(name));
    reply.action('typing').markdown(Messages.start.explain);
    reply.action('typing').keyboard(Menus.init, true).markdown(Messages.start.initOptions);
  }

  if (user.data.result) {
    reply.action('typing').keyboard().markdown(Messages.start.return(name));
    reply.action('typing').keyboard(Menus.complete).markdown(Messages.start.commands);
  }
};
