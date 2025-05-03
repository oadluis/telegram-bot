module.exports = (bot, chatId) => {
  const healthOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Nutrição 🥗', callback_data: 'health_nutrition' },
          { text: 'Exercícios 🏋️', callback_data: 'health_exercise' },
        ],
        [
          { text: 'Medicina 🏥', callback_data: 'health_medicine' },
          { text: 'Bem-estar 🧘', callback_data: 'health_wellness' },
        ],
        [{ text: '⬅️ Voltar', callback_data: 'back_to_main' }],
      ],
    },
  };

  bot.sendMessage(chatId, 'Escolha um tópico de Saúde:', healthOptions);
};
