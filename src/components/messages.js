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
    newRoute: 'Podemos cadastrar uma nova rota se quiser com o comando *nova_rota*, ou você pode ir ao menu principal através do comando *menu*.',
    errorNumberSeries: '*Temos um PROBLEMA!* Seu _número de série_ está errado. Vamos tentar novamente?',
    errorMenu: 'Precisaremos tentar novamente, agora vai dar tudo certo! Escolha novamente:',
    errorEmail: '*Temos um PROBLEMA!* É necessário digitar um _e-mail_ válido. Vamos tentar novamente?',
  },
  nova_rota: {
    lesson: name => `Para cadastrar uma nova rota ${name}, você precisará nos informar o _nome_ para esta rota, o _tipo de plantio_ e, se quiser, a _data_ do platio. Todas essas informações você deve separar por hífen conforme o exemplo abaixo.`,
    example: 'Seção 3 Norte - Abacaxi - 23/10/2017',
    go: 'Está pronto? Pode digitar as informações para criarmos esta rota.',
    success: 'Rota cadastrada, escolha uma das opções do menu.',
    error: 'Parece que ocorreu algum erro. Verifique se digitou os dados corretamente.',
    again: 'Vamos tentar novamente?',
  },
  rotas: {
    noRoutes: 'Seu *AGER* ainda não possui rotas cadastradas.',
    oneRoute: count => `Seu *AGER* possui ${count} rota cadastrada:`,
    moreRoutes: count => `Seu *AGER* possui ${count} rotas cadastradas:`,
    infoRoute: route => `Rota ${route.name} com plantio de ${route.type}`,
  },
  menu_command: {
    menu: name => `${name}, abaixo o menu principal, e a qualquer momento comece digitando / para visualizar a lista com os comandos especiais.`,
  },
  bateria: {
    levelWithName: (level, name) => `O *AGER* _${name}_ está com ${level}% de bateria.`,
    level: level => `Bateria com ${level}% de carga.`,
    noLevel: 'Seu *AGER* está *sem bateria*!',
  },
  temperatura: {
    temperature: (route, temperature, date) => `Rota ${route.name}: ${temperature}°C - _${date}_`,
  },
  humidade: {
    humidity: (route, humidity, date) => `Rota ${route.name}: ${humidity}% - _${date}_`,
  },
  help: {
    help1: name => `${name} o *AgerBot* utiliza alguns comandos especiais programados, que ao serem digitados eu irei largar tudo para lhe obedecer.`,
    help2: 'Você poderá ver uma lista a qualquer momento digitando / e aguarde (não envie a mensagem). O Telegram irá lhe mostrar a listagem e uma pequena orientação sobre cada comando.',
    help3: 'Nem todos os comandos irão lhe oferecer a informação que precisa, apenas se você já tiver um *AGER* já registrado.',
    helpMenu: 'Agora vamos continuar com menu principal, escolha uma das opções:',
  },
  default: {
    ager: 'CRIAR MENSAGEM',
    xau: 'Foi um prazer ajudar, até mais :)',
    noRoute: 'Seu *AGER* ainda não possui rotas cadastradas, e com isso não possui relatórios de trabalho.',
    noWork: route => `Ainda não foi feito nenhum percurso na rota ${route.name}.`,
    successSticker: 'CAADBAADZAIAAqqZQgFN40gGeHtKHAI',
  },
};
