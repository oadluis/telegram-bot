const calculateDates = require('../helpers/calculateDates');
const fetchNews = require('../helpers/fetchNews');
const sendArticles = require('../helpers/sendArticles');
const sendMainMenu = require('../menus/mainMenu');
const sendTopicMenu = require('../menus/topicMenu');
const sendScienceMenu = require('../menus/sections/scienceMenu');
const sendSportsMenu = require('../menus/sections/sportsMenu');
const sendTechMenu = require('../menus/sections/techMenu');
const sendHealthMenu = require('../menus/sections/healthMenu');
const sendEntertainmentMenu = require('../menus/sections/entertainmentMenu');
const sendEnvironmentMenu = require('../menus/sections/environmentMenu');
const { messages, callbacks } = require('../utils/constants');

module.exports = (bot) => {
  bot.on('callback_query', async (query) => {
    try {
      const chatId = query.message.chat.id;
      const data = query.data;

      // Tratamento dos botões de navegação
      if (data === callbacks.BACK_TO_MAIN) {
        sendMainMenu(bot, chatId);
        return;
      }

      if (data === callbacks.BACK_TO_SECTIONS) {
        // Volta para o menu de seções com o mesmo período
        const lastMessage = query.message.text;
        if (lastMessage.includes('notícias')) {
          // Se estiver vindo das notícias, volta para o menu principal
          sendMainMenu(bot, chatId);
        } else {
          // Se estiver vindo de uma seção, volta para o menu de seções
          sendTopicMenu(bot, chatId);
        }
        return;
      }

      switch (true) {
        // Caso o usuário selecione um período
        case data.startsWith('noticias_'):
          try {
            const periodo = data.split('_')[1];
            const { fromDate, toDate } = calculateDates(periodo);
            const sectionOptions = {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Tecnologia 💻',
                      callback_data: `section_tech_${fromDate}_${toDate}`,
                    },
                    {
                      text: 'Ciência 🧪',
                      callback_data: `section_science_${fromDate}_${toDate}`,
                    },
                  ],
                  [
                    {
                      text: 'Esportes ⚽',
                      callback_data: `section_sports_${fromDate}_${toDate}`,
                    },
                    {
                      text: 'Saúde 🏥',
                      callback_data: `section_health_${fromDate}_${toDate}`,
                    },
                  ],
                  [
                    {
                      text: 'Entretenimento 🎬',
                      callback_data: `section_entertainment_${fromDate}_${toDate}`,
                    },
                    {
                      text: 'Meio Ambiente 🌱',
                      callback_data: `section_environment_${fromDate}_${toDate}`,
                    },
                  ],
                  [{ text: '⬅️ Voltar', callback_data: callbacks.BACK_TO_MAIN }],
                ],
              },
            };

            bot.sendMessage(
              chatId,
              'Escolha uma seção para explorar:',
              sectionOptions
            );
          } catch (error) {
            console.error('Erro ao calcular datas:', error);
            bot.sendMessage(
              chatId,
              'Erro ao calcular as datas. Por favor, tente novamente.'
            );
          }
          break;

        // Caso o usuário selecione uma seção
        case data.startsWith('section_'):
          try {
            const [_, section, fromDate, toDate] = data.split('_');

            // Mostra os tópicos disponíveis na seção, passando o período no callback_data
            switch (section) {
              case 'tech':
                sendTechMenu(bot, chatId, fromDate, toDate);
                break;
              case 'science':
                sendScienceMenu(bot, chatId, fromDate, toDate);
                break;
              case 'sports':
                sendSportsMenu(bot, chatId, fromDate, toDate);
                break;
              case 'health':
                sendHealthMenu(bot, chatId, fromDate, toDate);
                break;
              case 'entertainment':
                sendEntertainmentMenu(bot, chatId, fromDate, toDate);
                break;
              case 'environment':
                sendEnvironmentMenu(bot, chatId, fromDate, toDate);
                break;
              default:
                bot.sendMessage(
                  chatId,
                  'Seção não reconhecida. Por favor, tente novamente.'
                );
            }
          } catch (error) {
            console.error('Erro ao processar a seção:', error);
            bot.sendMessage(
              chatId,
              'Erro ao processar a seção. Por favor, tente novamente.'
            );
          }
          break;

        // Caso o usuário selecione um tópico
        case data.startsWith('topic_'):
          try {
            const [_, section, topic, fromDate, toDate] = data.split('_');

            // Busca as notícias com base no tópico e no período
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

            // Envia o menu de navegação após as notícias
            const navigationOptions = {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: '↩️ Escolher outro tópico',
                      callback_data: `section_${section}_${fromDate}_${toDate}`,
                    },
                  ],
                  [
                    {
                      text: '🔄 Escolher outro período',
                      callback_data: callbacks.BACK_TO_MAIN,
                    },
                  ],
                ],
              },
            };

            bot.sendMessage(chatId, messages.chooseAnotherTopic, navigationOptions);
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
