require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const callbackHandler = require('./handlers/callbackHandler');
const messageHandler = require('./handlers/messageHandler');

// Inicializa o bot com o token do Telegram
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Lida com erros de polling
bot.on('polling_error', (error) => {
  console.error('Erro de polling:', error);
});

// Registra os handlers
callbackHandler(bot);
messageHandler(bot);

// Mensagem de inicialização
console.log('Bot iniciado e aguardando comandos...');
