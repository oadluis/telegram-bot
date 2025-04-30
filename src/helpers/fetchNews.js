async function fetchNews(bot, newsApiKey, chatId, topic, fromDate, toDate) {
  const axios = require('axios');
  try {
    if (!topic || !fromDate || !toDate) {
      console.error('Parâmetros inválidos:', { topic, fromDate, toDate });
      return []; // Retorna um array vazio
    }

    if (!newsApiKey) {
      console.error('Chave da API ausente ou inválida.');
      return []; // Retorna um array vazio
    }

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

    if (!response.data || !Array.isArray(response.data.articles)) {
      console.error('Resposta inesperada da API:', response.data);
      return []; // Retorna um array vazio
    }

    const articles = response.data.articles.slice(0, 5); // Limita a 5 notícias
    if (articles.length === 0) {
      return []; // Retorna um array vazio
    }

    return articles; // Retorna os artigos encontrados
  } catch (error) {
    console.error(
      'Erro ao buscar notícias:',
      error.response?.data || error.message || error
    );
    return []; // Retorna um array vazio em caso de erro
  }
}

module.exports = fetchNews;
