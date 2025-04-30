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

module.exports = fetchNews;
