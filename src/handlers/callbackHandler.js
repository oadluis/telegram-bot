const calculateDates = require('../helpers/calculateDates');
const fetchNews = require('../helpers/fetchNews');
const sendArticles = require('../helpers/sendArticles');
const sendMainMenu = require('../menus/mainMenu');
const sendScienceMenu = require('../menus/sections/scienceMenu');
const sendSportsMenu = require('../menus/sections/sportsMenu');
const sendTechMenu = require('../menus/sections/techMenu');
const { topicMap, messages } = require('../utils/constants');

module.exports = (bot) => {
  bot.on('callback_query', async (query) => {
    try {
      console.log(query);
      const chatId = query.message.chat.id;
      const data = query.data;

      switch (true) {
        case data === 'section_tech':
          sendTechMenu(bot, chatId);
          break;

        case data === 'section_science':
          sendScienceMenu(bot, chatId);
          break;

        case data === 'section_sports':
          sendSportsMenu(bot, chatId);
          break;

        case data === 'back_to_main':
          sendMainMenu(bot, chatId);
          break;

        case data.startsWith('tech_'):
          try {
            const topic = data.split('_')[1];
            const { fromDate, toDate } = calculateDates('hoje');
            const articles = await fetchNews(
              bot,
              process.env.NEWS_API_KEY,
              chatId,
              topic,
              fromDate,
              toDate
            );

            if ((!Array, isArray(articles) || articles.length === 0)) {
              bot.sendMessage(chatId, messages.noNews);
              break;
            }

            await sendArticles(bot, chatId, articles);

            bot.sendMessage(chatId, messages.chooseAnotherTopic, {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: '↩️ Escolher outro tópico',
                      callback_data: 'back_to_main',
                    },
                  ],
                ],
              },
            });
          } catch (error) {
            console.error('Erro ao calcular datas:', error);
            bot.sendMessage(
              chatId,
              'Ocorreu um erro ao calcular as datas. Por favor, tente novamente.'
            );
          }
          break;

        default:
          console.log(`Callback não reconhecido: ${data}`);
      }
    } catch (error) {
      console.error('Erro no callback handler:', error);
      bot.sendMessage(
        query.message.chat.id,
        'Ocorreu um erro inesperado. Por favor, tente novamente.'
      );
    }
  });
};
