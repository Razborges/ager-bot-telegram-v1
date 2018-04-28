module.exports = {
  newRoute: {
    parse_mode: 'markdown',
    reply_markup: {
      remove_keyboard: true,
      one_time_keyboard: true,
      keyboard: [['Cadastrar rota'], ['/start']],
    },
  },

  message: {
    info: 'Para registrar um *AGER* você deve nos informar o número de série e seu e-mail separados por hífen. Exemplo: _12345abc - seu@email.com_',
    digit: 'Está pronto? Digite agora:',
    success: 'Seu *AGER* foi registrado para você!',
    newRoute: 'Agora precisamos cadastrar uma nova rota de trabalho.',
    errorNumberSeries: 'Temos um PROBLEMA! Seu número de série está errado ou houve algum erro de digitação.',
    errorMenu: 'Precisaremos tentar novamente, agora vai dar tudo certo! Escolha novamente:',
    errorEmail: 'Temos um PROBLEMA! As informações que passou não estão na forma corretas, tente novamente.',
  },
};
