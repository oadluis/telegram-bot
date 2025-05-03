function sendScienceMenu(bot, chatId) {
  const scienceOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Espaço 🚀',
            callback_data: `science_space_${fromDate}_${toDate}`,
          },
          {
            text: 'Física ⚛️',
            callback_data: `science_physics_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'Biologia 🧬',
            callback_data: `science_biology_${fromDate}_${toDate}`,
          },
          {
            text: 'Clima 🌦️',
            callback_data: `science_climate_${fromDate}_${toDate}`,
          },
        ],
        [{ text: '⬅️ Voltar', callback_data: 'back_to_sections' }],
      ],
    },
  };

  bot.sendMessage(chatId, 'Escolha um tópico de Ciência:', scienceOptions);
}

module.exports = sendScienceMenu;
