const { callbacks } = require('../../utils/constants');

function sendScienceMenu(bot, chatId, fromDate, toDate) {
  const scienceOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Espaço 🚀',
            callback_data: `topic_science_space_${fromDate}_${toDate}`,
          },
          {
            text: 'Física ⚛️',
            callback_data: `topic_science_physics_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'Biologia 🧬',
            callback_data: `topic_science_biology_${fromDate}_${toDate}`,
          },
          {
            text: 'Clima 🌦️',
            callback_data: `topic_science_climate_${fromDate}_${toDate}`,
          },
        ],
        [{ text: '⬅️ Voltar', callback_data: callbacks.BACK_TO_SECTIONS }],
      ],
    },
  };

  bot.sendMessage(chatId, 'Escolha um tópico de Ciência:', scienceOptions);
}

module.exports = sendScienceMenu;
