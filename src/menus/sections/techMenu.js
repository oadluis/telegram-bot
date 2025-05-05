const { callbacks } = require('../../utils/constants');

function sendTechMenu(bot, chatId, fromDate, toDate) {
  const techTopicsOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Tecnologia Geral 💻',
            callback_data: `topic_tech_general_${fromDate}_${toDate}`,
          },
          {
            text: 'Inteligência Artificial 🤖',
            callback_data: `topic_tech_ai_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'Desenvolvimento de Software 🛠️',
            callback_data: `topic_tech_software_${fromDate}_${toDate}`,
          },
          {
            text: 'Blockchain ⛓️',
            callback_data: `topic_tech_blockchain_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'CyberSecurity 🔒',
            callback_data: `topic_tech_cybersecurity_${fromDate}_${toDate}`,
          },
          {
            text: 'Gadgets 📱',
            callback_data: `topic_tech_gadgets_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'Programação 💾',
            callback_data: `topic_tech_programming_${fromDate}_${toDate}`,
          },
          {
            text: 'Web Development 🌐',
            callback_data: `topic_tech_webdev_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'Open Source 🆓',
            callback_data: `topic_tech_opensource_${fromDate}_${toDate}`,
          },
          {
            text: 'Coding 🧑‍💻',
            callback_data: `topic_tech_coding_${fromDate}_${toDate}`,
          },
        ],
        [{ text: '↩️ Voltar', callback_data: callbacks.BACK_TO_SECTIONS }],
      ],
    },
  };

  bot.sendMessage(chatId, 'Escolha um tópico de Tecnologia:', techTopicsOptions);
}

module.exports = sendTechMenu;
