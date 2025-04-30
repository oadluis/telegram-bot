function formatMessage(article) {
    const title = (article.title || 'Sem título').toUpperCase();
    const description = article.description || 'Sem descrição disponível';
    const url = article.url || '#';
    const imageUrl = article.urlToImage || null;
  
    const message = `📰 *${title}*\n\n_${description}_\n\n[Fonte ⛲: ${url}]`;
  
    return { message, imageUrl };
  }
  
  module.exports = formatMessage;