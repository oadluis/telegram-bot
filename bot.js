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
bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === "noticias_hoje" || "noticias_semana" || "noticias_mes") {
    const topicosOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Tecnologia 💻", callback_data: "tech" },
            { text: "Agropecuária 🪴", callback_data: "agro" },
          ],
          [
            { text: "Economia 🤑", callback_data: "economia" },
            { text: "Política 🔈", callback_data: "politica" },
          ],
          [
            { text: "Esportes ⚽", callback_data: "esportes" },
            { text: "Ciência 🧪", callback_data: "ciencia" },
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
    const [periodo, topic] = data.split("_");

    //* Define as datas com base no período escolhido
    let fromDate, toDate;
    const today = new Date();
    if (periodo === "noticias_hoje") {
      fromDate = toDate = today.toISOString().split("T")[0];
    } else if (periodo === "noticias_semana") {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      fromDate = lastWeek.toISOString().split("T")[0];
      toDate = today.toISOString().split("T")[0];
    } else if (periodo === "noticias_mes") {
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      fromDate = lastMonth.toISOString().split("T")[0];
      toDate = today.toISOString().split("T")[0];
    }
  }
});
