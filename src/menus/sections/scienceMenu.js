function sendScienceMenu(bot, chatId) {
  const scienceOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Espaço 🚀', callback_data: 'science_space' },
          { text: 'Física ⚛️', callback_data: 'science_physics' },
        ],
        [
          { text: 'Biologia 🧬', callback_data: 'science_biology' },
          { text: 'Clima 🌦️', callback_data: 'science_climate' },
        ],
        [{ text: '⬅️ Voltar', callback_data: 'back_to_main' }],
      ],
    },
  };

  bot.sendMessage(chatId, 'Escolha um tópico de Ciência:', scienceOptions);
}

module.exports = sendScienceMenu;
