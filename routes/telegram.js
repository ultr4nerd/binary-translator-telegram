const express = require('express')
const debug = require('debug')('app:telegram')
const Chat = require('../models/chat')
const telegramService = require('../services/telegram')
const translatorService = require('../services/translator')

const router = express.Router()

router.post('/:token', async (req, res) => {
  const update = req.body
  if (req.params.token !== process.env.TELEGRAM_TOKEN) {
    debug('Invalid token')
    return res.sendStatus(200)
  }

  const chatID = telegramService.getChatID(update)
  if (!chatID) {
    debug('Chat ID not provided')
    return res.sendStatus(200)
  }

  const [chat, created] = await Chat.getOrCreate(chatID)

  if (update.message) {
    const text = update.message.text.trim()
    if (created || text === '/start') {
      await telegramService.sendWelcome(chatID)
    } else if (text === '/mode') {
      await telegramService.sendModePrompt(chatID, chat.mode)
    } else if (text === 'Texto a binario') {
      chat.mode = 'text'
      await chat.save()
      const text = '¡Listo! El modo seleccionado ahora es texto a binario'
      await telegramService.sendSimpleMessage(chatID, text)
    } else if (text === 'Binario a texto') {
      chat.mode = 'binary'
      await chat.save()
      const text = '¡Listo! El modo seleccionado ahora es binario a texto'
      await telegramService.sendSimpleMessage(chatID, text)
    } else if (chat.mode === 'text') {
      const result = translatorService.textToBinary(text)
      if (result) {
        await telegramService.sendSimpleMessage(chatID, result)
      } else {
        const message = 'No fue posible traducir este mensaje de texto a binario, inténtalo de nuevo'
        await telegramService.sendSimpleMessage(chatID, message)
      }
    } else if (chat.mode === 'binary') {
      const result = translatorService.binaryToText(text)
      if (result) {
        await telegramService.sendSimpleMessage(chatID, result)
      } else {
        const message = 'No fue posible traducir este mensaje de binario a texto, inténtalo de nuevo'
        await telegramService.sendSimpleMessage(chatID, message)
      }
    }
  }

  if (update.my_chat_member) {
    await chat.delete()
    debug(`Chat with ID ${chatID} deleted`)
  }

  return res.sendStatus(200)
})

module.exports = router
