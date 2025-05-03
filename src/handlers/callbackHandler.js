module.exports = (bot) => {
  bot.on('callback_query', async (query) => {
    try {
      const chatId = query.message.chat.id;
      const data = query.data;

      switch (true) {
        case data === 'section_tech':
          sendTechMenu(bot, chatId);
          break;

        case data === 'section_science':
          sendScienceMenu(bot, chatId);
          break;

        case data === 'section_sports':
          sendSportsMenu(bot, chatId);
          break;

        case data === 'section_health':
          sendHealthMenu(bot, chatId);
          break;

        case data === 'section_entertainment':
          sendEntertainmentMenu(bot, chatId);
          break;

        case data === 'section_environment':
          sendEnvironmentMenu(bot, chatId);
          break;

        case data === 'back_to_main':
          sendMainMenu(bot, chatId);
          break;

        case data.startsWith('noticias_'): // Novo caso para lidar com períodos
          try {
            const periodo = data.split('_')[1];
            const { fromDate, toDate } = calculateDates(periodo);

            bot.sendMessage(chatId, `Período selecionado: ${periodo}`);
            bot.sendMessage(chatId, `De: ${fromDate} Até: ${toDate}`);
          } catch (error) {
            console.error('Erro ao calcular datas:', error);
            bot.sendMessage(
              chatId,
              'Erro ao calcular as datas. Por favor, tente novamente.'
            );
          }
          break;

        case data.startsWith('tech_'):
        case data.startsWith('science_'):
        case data.startsWith('sports_'):
        case data.startsWith('health_'):
        case data.startsWith('entertainment_'):
        case data.startsWith('environment_'):
          try {
            const [section, topic] = data.split('_');
            const { fromDate, toDate } = calculateDates('hoje');
            const articles = await fetchNews(
              bot,
              process.env.NEWS_API_KEY,
              chatId,
              topic,
              fromDate,
              toDate
            );

            if (!Array.isArray(articles) || articles.length === 0) {
              bot.sendMessage(chatId, messages.noNews);
              break;
            }

            await sendArticles(bot, chatId, articles);

            bot.sendMessage(chatId, messages.chooseAnotherTopic, {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: '↩️ Escolher outro tópico',
                      callback_data: 'back_to_main',
                    },
                  ],
                ],
              },
            });
          } catch (error) {
            console.error('Erro ao buscar notícias:', error);
            bot.sendMessage(
              chatId,
              'Ocorreu um erro ao buscar notícias. Por favor, tente novamente.'
            );
          }
          break;

        default:
          console.log(`Callback não reconhecido: ${data}`);
          bot.sendMessage(
            chatId,
            'Opção não reconhecida. Por favor, tente novamente.'
          );
      }
    } catch (error) {
      console.error('Erro no callback handler:', error);
      bot.sendMessage(
        query.message.chat.id,
        'Ocorreu um erro inesperado. Por favor, tente novamente.'
      );
    }
  });
};
