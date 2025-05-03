module.exports = (bot, chatId) => {
  const sportsOptions = {
    reply_markup: {
      inline_keybord: [
        [
          { text: 'Futebol ⚽', callback_data: 'sports_football' },
          { text: 'Basquete 🏀', callback_data: 'sports_football' },
        ],
        [
          { text: 'Tênis 🎾', callback_data: 'sports_tennis' },
          { text: 'Corrida 🏃', callback_data: 'sports_running' },
        ],
        [{ text: '↩️ Voltar', callback_data: 'back_to_main' }],
      ],
    },
  };

  bot.sendMessage(chatId, 'Escolha um tópico de Esportes:', sportsOptions);
};
