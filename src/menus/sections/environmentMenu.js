function sendEnvironmentMenu(bot, chatId) {
  const environmentOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Sustentabilidade 🌱',
            callback_data: 'environment_sustainability',
          },
          {
            text: 'Energias Renováveis ⚡',
            callback_data: 'environment_renewables',
          },
        ],
        [
          { text: 'Conservação 🐾', callback_data: 'environment_conservation' },
          {
            text: 'Mudanças Climáticas 🌍',
            callback_data: 'environment_climate',
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
