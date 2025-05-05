function sendSportsMenu(bot, chatId, fromDate, toDate) {
  const sportsOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Futebol ⚽', callback_data: `sports_football_${fromDate}_${toDate}` },
          { text: 'Basquete 🏀', callback_data: `sports_basketball_${fromDate}_${toDate}` },
        ],
        [
          { text: 'Tênis 🎾', callback_data: `sports_tennis_${fromDate}_${toDate}` },
          { text: 'Corrida 🏃', callback_data: `sports_running_${fromDate}_${toDate}` },
        ],
        [{ text: '↩️ Voltar', callback_data: 'back_to_sections' }],
      ],
    },
  };

  bot.sendMessage(chatId, 'Escolha um tópico de Esportes:', sportsOptions);
}

module.exports = sendSportsMenu;
