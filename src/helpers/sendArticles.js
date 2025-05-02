module.exports = async (bot, chatId, articles) => {
  for (const article of articles) {
    const { message, imageUrl } = formatMessage(article);

    // Lógica para mandar o arquivo com foto ou sem dependendo das condições.
    if (imageUrl) {
      await bot.sendPhoto(chatId, imageUrl, {
        caption: message,
        parse_node: 'Markdown',
      });
    } else {
      await bot.sendMessage(chatId, message, { parse_node: 'Markdown' });
    }
  }
};
