const TelegramBot = require('node-telegram-bot-api');
class Telegram{
    constructor(){
        const token = '6603068074:AAGRtf6Xl536826tTI-_buXAtfXAjGBb4SI';
        this.bot = new TelegramBot(token, { polling: false });
        this.chatId = '-1002060577009';
    }
    sendMessage(message){
        console.log("Message:",message);
        return this.bot.sendMessage(this.chatId, message);
    }
}
module.exports = Telegram;