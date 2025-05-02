require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const callbackHandler = require('./handlers/callbackHandler');
const messageHandler = require('./handlers/messageHandler');
// const sendMainMenu = require('./menus/mainMenu');
// const sendTopicMenu = require('./menus/topicMenu');
// const calculateDates = require('./helpers/calculateDates');
// const fetchNews = require('./helpers/fetchNews');
// const formatMessage = require('./helpers/formatMessage');
// const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Inicializa o bot com o token do Telegram
const bot = new TelegramBot(process.env, BOT_TOKEN, { polling: true });

// Lida com erros de polling
bot.on('polling_error', (error) => {
  console.error('Erro de polling:', error);
});

// Registra os handlers
callbackHandler(bot);
messageHandler(bot);

// Mensagem de inicialização
console.log('Bot iniciado e aguardando comandos...');

// bot.on('polling_error', (error) => {
//   console.error('Erro de polling:', error);
// });

// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   const messageText = msg.text;

//   if (messageText === '/start') {
//     sendMainMenu(bot, chatId);
//   }
// });

// bot.on('callback_query', async (callbackQuery) => {
//   const chatId = callbackQuery.message.chat.id;
//   const data = callbackQuery.data;

//   if (
//     data === 'noticias_hoje' ||
//     data === 'noticias_semana' ||
//     data === 'noticias_mes'
//   ) {
//     sendTopicMenu(bot, chatId, data);
//   } else if (data.includes('_')) {
//     const [_, periodo, topico] = data.split('_');

//     if (!periodo || !topico) {
//       bot.sendMessage(
//         chatId,
//         'Dados inválidos recebidos. Por favor, tente novamente.'
//       );
//       return;
//     }

//     const topicMap = {
//       tech: 'technology',
//       agro: 'agriculture',
//       economia: 'business',
//       politica: 'politics',
//       esportes: 'sports',
//       ciencia: 'science',
//     };

//     const topic = topicMap[topico];

//     if (!topic) {
//       bot.sendMessage(chatId, 'Tópico inválido. Por favor, tente novamente.');
//       return;
//     }

//     const { fromDate, toDate } = calculateDates(periodo);

//     if (!fromDate || !toDate) {
//       bot.sendMessage(
//         chatId,
//         'Erro ao calcular as datas. Por favor, tente novamente,'
//       );
//       return;
//     }

//     const articles = await fetchNews(
//       bot,
//       process.env.NEWS_API_KEY,
//       chatId,
//       topic,
//       fromDate,
//       toDate
//     );

//     if (!Array.isArray(articles) || articles.length === 0) {
//       bot.sendMessage(
//         chatId,
//         'Nenhuma notícia encontrada ou ocorreu um erro ao buscar notícias.'
//       );
//       return;
//     }

//     for (const article of articles) {
//       const { message, imageUrl } = formatMessage(article);

//       if (imageUrl) {
//         await bot.sendPhoto(chatId, imageUrl, {
//           caption: message,
//           parse_mode: 'Markdown',
//         });
//       } else {
//         await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
//       }
//     }

//     bot.sendMessage(
//       chatId,
//       'Deseja escolher outro tópico? Clique no botão abaixo:',
//       {
//         reply_markup: {
//           inline_keyboard: [
//             [
//               {
//                 text: '↩️ Escolher outro tópico',
//                 callback_data: 'voltar_menu',
//               },
//             ],
//           ],
//         },
//       }
//     );
//   } else if (data === 'voltar_menu') {
//     sendMainMenu(bot, chatId);
//   }
// });
