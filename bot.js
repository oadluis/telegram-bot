require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const token = process.env.BOT_TOKEN;
const newsApiKey = process.env.NEWS_API_KEY;
const bot = new TelegramBot(token, { polling: true });

//* Inicia o bot e manda uma mensagem de boas vindas e o botão com a opção de notícias de hoje
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "/start") {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Notícias de Hoje", callback_data: "noticias_hoje" }],
          [{ text: "Notícias da Semana", callback_data: "noticias_semana" }],
          [{ text: "Notícias do mês", callback_data: "noticias_mes" }],
        ],
      },
    };

    bot.sendMessage(
      chatId,
      "Bem vindo ao NewsTodayBR! Você pode me perguntar sobre as últimas notícias do Brasil e do mundo. O que você gostaria de saber?",
      options
    );
  }
});

//* Escolha dos topicos para ver as noticias
bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  console.log("Callback data recebido:", data);

  if (
    data === "noticias_hoje" ||
    data === "noticias_semana" ||
    data === "noticias_mes"
  ) {
    const topicosOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Tecnologia 💻", callback_data: `${data}_tech` },
            { text: "Agropecuária 🪴", callback_data: `${data}_agro` },
          ],
          [
            { text: "Economia 🤑", callback_data: `${data}_economia` },
            { text: "Política 🔈", callback_data: `${data}_politica` },
          ],
          [
            { text: "Esportes ⚽", callback_data: `${data}_esportes` },
            { text: "Ciência 🧪", callback_data: `${data}_ciencia` },
          ],
        ],
      },
    };

    bot.sendMessage(
      chatId,
      "Escolha um tópico para ver as notícias mais relevantes:",
      topicosOptions
    );
  } else if (data.includes("_")) {
    // Divide o callback_data no formato esperado: noticias_<periodo>_<topico>
    const parts = data.split("_");
    if (parts.length !== 3) {
      bot.sendMessage(
        chatId,
        "Erro: formato de dado inválido. Por favor, tente novamente."
      );
      return;
    }
    const [_, periodo, topico] = parts; // Extração segura do período e tópico
    console.log("Período:", periodo); // log para depuração
    console.log("Tópico:", topico); // log para depuração

    //* Define as datas com base no período escolhido
    let fromDate, toDate;
    const today = new Date();
    if (periodo === "noticias_hoje") {
      fromDate = toDate = today.toISOString().split("T")[0];
      console.log(callback_data);
    } else if (periodo === "noticias_semana") {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      fromDate = lastWeek.toISOString().split("T")[0];
      toDate = today.toISOString().split("T")[0];
      console.log(callback_data);
    } else if (periodo === "noticias_mes") {
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      fromDate = lastMonth.toISOString().split("T")[0];
      toDate = today.toISOString().split("T")[0];
      console.log(callback_data);
    }

    //* Mapeia os tópicos para palavras-chave
    const topicMap = {
      tech: "technology",
      agro: "agriculture",
      economia: "business",
      politica: "politics",
      esportes: "sports",
      ciencia: "science",
    };

    //* Verifica se o tópico foi mapeado corretamente
    const topic = topicMap[topico];
    if (!topic) {
      console.log(topic);
      bot.sendMessage(chatId, "Tópico inválido. Por favor, tente novamente.");
      return;
    }

    //* Faz a requisição para a API
    try {
      console.log(topic);
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: topic,
          from: fromDate,
          to: toDate,
          language: "pt",
          sortBy: "publishedAt",
          apiKey: newsApiKey,
        },
      });

      const articles = response.data.articles.slice(0, 5); // limita a 5 noticias
      if (articles.length === 0) {
        bot.sendMessage(chatId, `Nenhuma notícia encontrada sobre ${topic}.`);
        return;
      }

      for (const article of articles) {
        const title = article.title || "Sem título";
        const description = article.description || "Sem descrição disponível";
        const url = article.url || "#";
        const imageUrl = article.urlToImage || null;

        let message = `📰 <b>${title}</b>\n\n`;
        message += `${description}\n\n`;
        message += `<a href="${url}">Fonte ⛲: ${url}</a>`;

        if (imageUrl) {
          // Envia a mensagem com imagem
          await bot.sendPhoto(chatId, imageUrl, {
            caption: message,
            parse_mode: "HTML",
          });
        } else {
          // Envia a mensagem sem imagem
          await bot.sendMessage(chatId, message, { parse_node: "HTML" });
        }

        // let newsMessage = `📰 <b><b>Notícias sobre ${topic} (${periodo.replace(
        //   "notícias_",
        //   ""
        // )}):\n\n`;
        // articles.forEach((article, index) => {
        //   newsMessage += `${index + 1}. [${article.title}](${article.url})\n`;
        // });

        // bot.sendMessage(chatId, newsMessage, { parse_node: "Markdown" });
      }
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
      bot.sendMessage(chatId, "Desculpe, ocorreu um erro ao buscar notícias.");
    }
  }
});
