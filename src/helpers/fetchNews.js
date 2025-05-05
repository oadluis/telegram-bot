async function fetchNews(bot, newsApiKey, chatId, topic, fromDate, toDate) {
  const axios = require('axios');
  try {
    if (!topic || !fromDate || !toDate) {
      console.error('Parâmetros inválidos:', { topic, fromDate, toDate });
      bot.sendMessage(chatId, '❌ Erro: Parâmetros inválidos para busca de notícias. Por favor, tente novamente.');
      return [];
    }

    if (!newsApiKey) {
      console.error('Chave da API ausente ou inválida.');
      bot.sendMessage(chatId, '❌ Erro: Configuração da API de notícias inválida. Por favor, contate o administrador.');
      return [];
    }

    // Ajusta a query para melhorar resultados do período "hoje"
    const searchQuery = fromDate === toDate 
      ? `${topic} (${fromDate})` 
      : topic;

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: searchQuery,
        from: fromDate,
        to: toDate,
        language: 'pt',
        sortBy: 'publishedAt',
        apiKey: newsApiKey,
      },
    });

    if (!response.data || !Array.isArray(response.data.articles)) {
      console.error('Resposta inesperada da API:', response.data);
      bot.sendMessage(chatId, '❌ Erro: Resposta inesperada da API de notícias. Por favor, tente novamente mais tarde.');
      return [];
    }

    const articles = response.data.articles.slice(0, 5); // Limita a 5 notícias
    if (articles.length === 0) {
      bot.sendMessage(chatId, '📭 Nenhuma notícia encontrada para o período e tópico selecionados. Tente outro período ou tópico.');
      return [];
    }

    return articles;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error.response?.data || error.message || error);
    
    // Mensagens de erro mais específicas baseadas no tipo de erro
    if (error.response) {
      switch (error.response.status) {
        case 401:
          bot.sendMessage(chatId, '❌ Erro: Chave da API inválida. Por favor, contate o administrador.');
          break;
        case 429:
          bot.sendMessage(chatId, '❌ Erro: Limite de requisições excedido. Por favor, tente novamente mais tarde.');
          break;
        default:
          bot.sendMessage(chatId, `❌ Erro ao buscar notícias: ${error.response.data.message || 'Erro desconhecido'}`);
      }
    } else if (error.request) {
      bot.sendMessage(chatId, '❌ Erro: Não foi possível conectar à API de notícias. Verifique sua conexão e tente novamente.');
    } else {
      bot.sendMessage(chatId, '❌ Erro inesperado ao buscar notícias. Por favor, tente novamente mais tarde.');
    }
    return [];
  }
}

module.exports = fetchNews;

// commit of day! :)
