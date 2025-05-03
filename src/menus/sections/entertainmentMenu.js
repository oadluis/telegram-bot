function sendEntertainmentMenu(bot, chatId) {
  const entertainmentOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Filmes 🎥', callback_data: 'entertainment_movies' },
          { text: 'Música 🎵', callback_data: 'entertainment_music' },
        ],
        [
          { text: 'Jogos 🎮', callback_data: 'entertainment_games' },
          { text: 'Séries 📺', callback_data: 'entertainment_series' },
        ],
        [{ text: '⬅️ Voltar', callback_data: 'back_to_main' }],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    'Escolha um tópico de Entretenimento:',
    entertainmentOptions
  );
}

module.exports = sendEntertainmentMenu;
