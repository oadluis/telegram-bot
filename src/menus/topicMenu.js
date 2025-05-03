function sendTopicMenu(bot, chatId, data) {
  const topicosOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Tecnologia 💻', callback_data: `section_tech` },
          { text: 'Agropecuária 🪴', callback_data: `section_agro` },
        ],
        [
          { text: 'Economia 🤑', callback_data: `section_economia` },
          { text: 'Política 🔈', callback_data: `section_politica` },
        ],
        [
          { text: 'Esportes ⚽', callback_data: `section_esportes` },
          { text: 'Ciência 🧪', callback_data: `section_ciencia` },
        ],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    'Escolha uma seção para explorar os tópicos:',
    sectionOptions
  );
}

module.exports = sendTopicMenu;
