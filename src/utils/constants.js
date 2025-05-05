const messages = {
  noNews: 'Nenhuma notícia encontrada para o período selecionado.',
  chooseAnotherTopic: 'Escolha outro tópico ou período para continuar.',
  error: 'Ocorreu um erro. Por favor, tente novamente.',
};

const callbacks = {
  BACK_TO_MAIN: 'back_to_main',
  BACK_TO_SECTIONS: 'back_to_sections',
  BACK_TO_TOPICS: 'back_to_topics',
};

module.exports = {
  topicMap: {
    tech: 'technology',
    agro: 'agriculture',
    economia: 'business',
    politica: 'politics',
    esportes: 'sports',
    ciencia: 'science',
  },
  message: {
    invalidData: 'Dados inválidos recebidos. Por favor, tente novamente.',
    dateError: 'Erro ao calcular as datas. Por favor, tente novamente.',
    noNews: 'Nenhuma notícia encontrada ou ocorreu um erro ao buscar notícias.',
    chooseAnotherTopic: 'Deseja escolher outro tópico? Clique no botão abaixo:',
  },
  messages,
  callbacks,
};
