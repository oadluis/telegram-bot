function sendTechMenu(bot, chatId) {
  const techTopicsOptions = {
    reply_markup: {
      inline_keybord: [
        [
          {
            text: 'Tecnologia Geral 💻',
            callback_data: `tech_general_${fromDate}_${toDate}`,
          },
          {
            text: 'Inteligência Artificial 🤖',
            callback_data: `tech_ai_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'Desenvolvimento de Software 🛠️',
            callback_data: `tech_software_${fromDate}_${toDate}`,
          },
          {
            text: 'Blockchain ⛓️',
            callback_data: `tech_blockchain_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'CyberSecurity 🔒',
            callback_data: `tech_cybersecurity_${fromDate}_${toDate}`,
          },
          {
            text: 'Gadgets 📱',
            callback_data: `tech_gadgets_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'Programação 💾',
            callback_data: `tech_programming_${fromDate}_${toDate}`,
          },
          {
            text: 'Web Development 🌐',
            callback_data: `tech_webdev_${fromDate}_${toDate}`,
          },
        ],
        [
          {
            text: 'Open Source 🆓',
            callback_data: `tech_opensource_${fromDate}_${toDate}`,
          },
          {
            text: 'Coding 🧑‍💻',
            callback_data: `tech_coding_${fromDate}_${toDate}`,
          },
        ],
        [{ text: '↩️ Voltar', callback_data: 'back_to_sections' }],
      ],
    },
  };
}

module.exports = sendTechMenu;
