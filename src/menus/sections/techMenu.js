function sendTechMenu(bot, chatId) {
  const techTopicsOptions = {
    reply_markup: {
      inline_keybord: [
        [
          { text: 'Tecnologia Geral 💻', callback_data: 'tech_general' },
          { text: 'Inteligência Artificial 🤖', callback_data: 'tech_ai' },
        ],
        [
          {
            text: 'Desenvolvimento de Software 🛠️',
            callback_data: 'tech_software',
          },
          { text: 'Blockchain ⛓️', callback_data: 'tech_blockchain' },
        ],
        [
          { text: 'CyberSecurity 🔒', callback_data: 'tech_cybersecurity' },
          { text: 'Gadgets 📱', callback_data: 'tech_gadgets' },
        ],
        [
          { text: 'Programação 💾', callback_data: 'tech_programming' },
          { text: 'Web Development 🌐', callback_data: 'tech_webdev' },
        ],
        [
          { text: 'Open Source 🆓', callback_data: 'tech_opensource' },
          { text: 'Coding 🧑‍💻', callback_data: 'tech_coding' },
        ],
        [{ text: '↩️ Voltar', callback_data: 'back_to_main' }],
      ],
    },
  };
}

module.exports = sendTechMenu;
