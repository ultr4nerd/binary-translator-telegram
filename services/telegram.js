const axios = require('axios')

class TelegramService {
  constructor() {
    this.token = process.env.TELEGRAM_TOKEN
    this.telegramURL = `https://api.telegram.org/bot${this.token}`
  }

  getChatID(update) {
    if (update.message) {
      return update.message.chat.id
    } else if (update.callback_query) {
      return update.callback_query.from.id
    } else if (update) {
      return update.my_chat_member.from.id
    } else {
      return null
    }
  }

  async sendWelcome(chatID) {
    const data = {
      chat_id: chatID,
      text: '¡Hola\\! Usa el comando /mode para cambiar de modo\\. Actualmente estás ocupando el modo *texto a binario*',
      parse_mode: 'MarkdownV2'
    }
    await this.run('sendMessage', data)
  }

  async sendModePrompt(chatID, mode) {
    const formattedMode = mode === 'binary' ? 'binario a texto' : 'texto a binario'

    const data = {
      chat_id: chatID,
      text: `Elige el modo deseado (actual: ${formattedMode})`,
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [
          [{text: 'Texto a binario'}, {text: 'Binario a texto'}]
        ]
      }
    }
    await this.run('sendMessage', data)
  }

  async sendSimpleMessage(chatID, text) {
    if (!text) {
      return
    }
    const data = {chat_id: chatID, text: text}
    await this.run('sendMessage', data)
  }

  async run(method, data) {
    try {
      await axios.post(`${this.telegramURL}/${method}`, data)
    } catch (err) {
      throw new Error(`Telegram Error: ${err.response.data.description}`)
    }
  }
}

module.exports = new TelegramService()
