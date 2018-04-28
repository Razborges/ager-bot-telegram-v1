module.exports = {
  default: {
    parse_mode: 'markdown',
    reply_markup: {
      remove_keyboard: true,
    },
  },
  init: {
    reply_markup: {
      remove_keyboard: true,
      one_time_keyboard: true,
      keyboard: [['Registrar um AGER'], ['Saber mais sobre o AGER']],
    },
  },
  complete: {
    parse_mode: 'markdown',
    reply_markup: {
      remove_keyboard: true,
      one_time_keyboard: true,
      keyboard: [['Ver minhas rotas'], ['Verificar temperaturas'], ['Verificar humidade'], ['Nível da bateria']],
    },
  },

  message: {
    welcome: name => `Olá ${name}! Eu sou o *AgerBot*. Eu irei te auxiliar durante a nossa conversa.`,
    explain: 'Vi que você é um usuário que ainda não possui um *AGER*. O *AGER* é um robô agrícola, e eu posso lhe ajudar a verificar algumas informações coletadas por ele.',
    initOptions: 'Vamos começar? Escollha uma das opções abaixo:',
    return: name => `${name} estou pronto para lhe ajudar novamente!`,
    commands: 'Escolha uma das opções do menu, e não se esqueça: a qualquer momento você pode utilizar nossos comandos especiais: `/start`',
  },
};