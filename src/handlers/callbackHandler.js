const sendMainMenu = require('../menus/mainMenu');
const sendTechMenu = require('../menus/sections/techMenu');
const fetchNews = require('../helpers/fetchNews');
const sendScienceMenu = require('../menus/sections/scienceMenu');
const calculateDates = require('../helpers/calculateDates');
const { topicMap, messages } = require('../utils/constants');

module.exports = (bot) => {
  bot.on('callback_query', (query) => {
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

      case data === 'back_to_main':
        sendMainMenu(bot, chatId);
        break;

      case data.startsWith('tech_'):
        const topic = data.split('_')[1];
        const { fromDate, toDate } = calculateDates('hoje');
        fetchNews(
          bot,
          process.env.NEWS_API_KEY,
          chatId,
          topic,
          fromDate,
          toDate
        );
        break;

      default:
        console.log(`Callback não reconhecido: ${data}`);
    }
  });
};
