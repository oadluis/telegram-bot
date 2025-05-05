const { callbacks } = require('../../utils/constants');

function sendSportsMenu(bot, chatId, fromDate, toDate) {
  const sportsOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { 
            text: 'Futebol ⚽', 
            callback_data: `topic_sports_football_${fromDate}_${toDate}` 
          },
          { 
            text: 'Basquete 🏀', 
            callback_data: `topic_sports_basketball_${fromDate}_${toDate}` 
          },
        ],
        [
          { 
            text: 'Tênis 🎾', 
            callback_data: `topic_sports_tennis_${fromDate}_${toDate}` 
          },
          { 
            text: 'Corrida 🏃', 
            callback_data: `topic_sports_running_${fromDate}_${toDate}` 
          },
        ],
        [{ text: '↩️ Voltar', callback_data: callbacks.BACK_TO_SECTIONS }],
      ],
    },
  };

  bot.sendMessage(chatId, 'Escolha um tópico de Esportes:', sportsOptions);
}

module.exports = sendSportsMenu;
