function sendEnvironmentMenu(bot, chatId, fromDate, toDate) {
  const environmentOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Sustentabilidade 🌱',
            callback_data: `topic_sustainability_${fromDate}_${toDate}`,
          },
          {
            text: 'Energias Renováveis ⚡',
            callback_data: `topic_renewables_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'Conservação 🐾',
            callback_data: `topic_conservation_${fromDate}_${toDate}`,
          },
          {
            text: 'Mudanças Climáticas 🌍',
            callback_data: `topic_climate_${fromDate}_${toDate}`,
          },
        ],
        [{ text: '⬅️ Voltar', callback_data: 'back_to_main' }],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    'Escolha um tópico de Meio Ambiente:',
    environmentOptions
  );
}

module.exports = sendEnvironmentMenu;
