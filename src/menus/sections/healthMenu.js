module.exports = (bot, chatId) => {
  const healthOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Nutrição 🥗',
            callback_data: `health_nutrition_${fromDate}_${toDate}`,
          },
          {
            text: 'Exercícios 🏋️',
            callback_data: `health_exercise_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'Medicina 🏥',
            callback_data: `health_medicine_${fromDate}_${toDate}`,
          },
          {
            text: 'Bem-estar 🧘',
            callback_data: `health_wellness_${fromDate}_${toDate}`,
          },
        ],
        [{ text: '⬅️ Voltar', callback_data: 'back_to_sections' }],
      ],
    },
  };

  bot.sendMessage(chatId, 'Escolha um tópico de Saúde:', healthOptions);
};
