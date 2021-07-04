const {model, Schema} = require('mongoose')

const chatSchema = new Schema(
  {
    _id: Number,
    mode: {
      type: String,
      enum: ['binary', 'text'],
      default: 'text'
    }
  },
  {
    timestamps: true,
  }
)

/**
 * Static method that gets or creates a chat
 * @param {number} chatID Telegram Chat ID
 * @return {Promise<Object>} Retrieved or created chat
 */
async function getOrCreate(chatID) {
  let created = false
  let chat

  chat = await this.findById(chatID)

  if (!chat) {
    created = true
    chat = await this.create({_id: chatID})
  }

  return [chat, created]
}

chatSchema.statics.getOrCreate = getOrCreate

module.exports = model('Chat', chatSchema)

