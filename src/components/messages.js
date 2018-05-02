module.exports = {
  start: {
    welcome: name => `Olá ${name}! Eu sou o *AgerBot*. Eu irei te auxiliar durante a nossa conversa.`,
    explain: 'Vi que você é um usuário que ainda não possui um *AGER* registrado. O *AGER* é um robô agrícola, e eu posso lhe ajudar a verificar algumas informações coletadas por ele.',
    initOptions: 'Posso lhe ajudar com as opções abaixo, qual delas você escolhe?',
    return: name => `${name} estou pronto para lhe ajudar novamente!`,
    commands: 'Escolha uma das opções do menu, e não se esqueça: a qualquer momento você pode utilizar nossos comandos especiais digitando / irá aparecer uma lista com as opções.',
  },
  register: {
    digitNumber: 'Para registrar um *AGER* você deve digitar o número de série:',
    digitEmail: 'Agora você deve digitar o seu e-maill de contato:',
    success: 'Seu *AGER* foi registrado!',
    newRoute: 'Podemos cadastrar uma nova rota se quiser com o comando *nova_rota*, ou você pode ir ao menu principal através do comando *start*.',
    errorNumberSeries: 'Temos um PROBLEMA! Seu número de série está errado ou houve algum erro de digitação.',
    errorMenu: 'Precisaremos tentar novamente, agora vai dar tudo certo! Escolha novamente:',
    errorEmail: 'Temos um PROBLEMA! As informações que passou não estão na forma corretas, tente novamente.',
  },
  nova_rota: {
    lesson: name => `Para cadastrar uma nova rota ${name}, você precisará nos informar o _nome_ para esta rota, o _tipo de plantio_ e, se quiser, a _data_ do platio. Todas essas informações você deve separar por hífen conforme o exemplo abaixo.`,
    example: 'Seção 3 Norte - Abacaxi - 23/10/2017',
    go: 'Está pronto? Pode digitar as informações para criarmos esta rota.',
    success: 'Rota cadastrada, escolha uma das opções do menu.',
    error: 'Parece que ocorreu algum erro.',
    again: 'Vamos tentar novamente?',
  },
  default: {
    ager: 'CRIAR MENSAGEM',
    xau: 'Foi um prazer ajudar, até mais :)',
  },
};
