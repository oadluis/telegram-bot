require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.BOT_TOKEN;
const newsApiKey = process.env.NEWS_API_KEY;
const bot = new TelegramBot(token, { polling: true });

//* Função para enviar o menu inicial
function sendMainMenu(chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Notícias de Hoje', callback_data: 'noticias_hoje' }],
        [{ text: 'Notícias da Semana', callback_data: 'noticias_semana' }],
        [{ text: 'Notícias do Mês', callback_data: 'noticias_mes' }],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    'Bem vindo ao NewsTodayBR! Você pode me perguntar sobre as últimas notícias do Brasil e do mundo. O que você gostaria de saber?',
    options
  );
}

//* Função para enviar o menu de tópicos
function sentTopicMenu(chatId, periodo) {
  const topicosOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Tecnologia 💻', callback_data: `${data}_tech` },
          { text: 'Agropecuária 🪴', callback_data: `${data}_agro` },
        ],
        [
          { text: 'Economia 🤑', callback_data: `${data}_economia` },
          { text: 'Política 🔈', callback_data: `${data}_politica` },
        ],
        [
          { text: 'Esportes ⚽', callback_data: `${data}_esportes` },
          { text: 'Ciência 🧪', callback_data: `${data}_ciencia` },
        ],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    'Escolha um tópico para ver as notícias mais relevantes',
    topicosOptions
  );
}

//* Função para buscar notícias
async function fetchNews(chatId, topic, fromDate, toDate) {
  try {
    console.log(topic);
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: topic,
        from: fromDate,
        to: toDate,
        language: 'pt',
        sortBy: 'publishedAt',
        apiKey: newsApiKey,
      },
    });

    const articles = response.data.articles.slice(0, 5); // limita a 5 noticias
    if (articles.length === 0) {
      bot.sendMessage(chatId, `Nenhuma notícia encontrada sobre ${topic}.`);
      return;
    }

    for (const article of articles) {
      const title = (article.title || 'Sem título').toUpperCase();
      const description = article.description || 'Sem descrição disponível';
      const url = article.url || '#';
      const imageUrl = article.urlToImage || null;

      let message = `📰 *${title}*\n\n`;
      message += `_${description}_\n\n`;
      message += `[Fonte ⛲: ${url}]`;

      // Envia mensagem com imagem
      if (imageUrl) {
        await bot.sendPhoto(chatId, imageUrl, {
          caption: message,
          parse_mode: 'Markdown',
        });
      } else {
        await bot.sendMessage(chatId, message, { parse_node: 'Markdown' });
      }
    }

    const menuOptions = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '↩️ Escolher outro tópico', callback_data: 'voltar_menu' }],
        ],
      },
    };

    bot.sendMessage(
      chatId,
      'Deseja escolher outro tópico? Clique no botão abaixo:',
      menuOptions
    );
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    bot.sendMessage(chatId, 'Desculpe, ocorreu um erro ao buscar notícias.');
  }
}

//* Função para calcular as datas com base no período
function calculateDates(periodo) {
  const today = new Date();
  let fromDate, toDate;

  if (periodo === 'noticias_hoje') {
    fromDate = toDate = today.toISOString().split('T')[0];
  } else if (periodo === 'noticias_semana') {
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    fromDate = lastWeek.toISOString().split('T')[0];
    toDate = today.toISOString().split('T')[0];
  } else if (periodo === 'noticias_mes') {
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    fromDate = lastMonth.toISOString().split('T')[0];
    toDate = today.toISOString().split('T')[0];
  }

  return { fromDate, toDate };
}

//* Inicia o bot e manda uma mensagem de boas-vindas
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === '/start') {
    sendMainMenu(chatId);
  }
});

//* Escolha dos topicos para ver as noticias
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  console.log('Callback data recebido:', data);

  if (
    data === 'noticias_hoje' ||
    data === 'noticias_semana' ||
    data === 'noticias_mes'
  ) {
    sentTopicMenu(chatId, data);
  } else if (data.includes('_')) {
    const parts = data.split('_');
    if (parts.length !== 3) {
      bot.sendMessage(
        chatId,
        'Erro: formato de dado inválido. Por favor, tente novamente.'
      );
      return;
    }

    const [_, periodo, topico] = parts;
    const topicMap = {
      tech: 'technology',
      agro: 'agriculture',
      economia: 'business',
      politica: 'politics',
      esportes: 'sports',
      ciencia: 'sience',
    };

    const topic = topicMap[topico];
    if (!topic) {
      bot.sendMessage(chatId, 'Tópico inválido. Por favor, tente novamente.');
      return;
    }

    const { fromDate, toDate } = calculateDates(periodo);
    await fetchNews(chatId, topic, fromDate, toDate);
  } else if (data === 'voltar_menu') {
    sendMainMenu(chatId);
  }
});
