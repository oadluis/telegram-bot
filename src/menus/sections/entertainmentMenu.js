function sendEntertainmentMenu(bot, chatId, fromDate, toDate) {
  const entertainmentOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Filmes 🎥', callback_data: `entertainment_movies_${fromDate}_${toDate}` },
          { text: 'Música 🎵', callback_data: `entertainment_music_${fromDate}_${toDate}` },
        ],
        [
          { text: 'Jogos 🎮', callback_data: `entertainment_games_${fromDate}_${toDate}` },
          { text: 'Séries 📺', callback_data: `entertainment_series_${fromDate}_${toDate}` },
        ],
        [{ text: '⬅️ Voltar', callback_data: 'back_to_sections' }],
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
