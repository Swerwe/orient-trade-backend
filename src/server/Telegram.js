const TelegramBot = require('node-telegram-bot-api');
const parseEcarLink = require('./ecar/parseEcarLink');
const writeData = require('../sql/writeData');
function isLink(text) {
    // Regular expression to match common URL patterns
    const urlRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/i;
    return urlRegex.test(text);
}
function parseId(url){
    var parts = url.split("-");
    var id = parts[1].split(".")[0];
    return id;

}
class Telegram{
    constructor(){
        const token = '6603068074:AAGRtf6Xl536826tTI-_buXAtfXAjGBb4SI';
        this.bot = new TelegramBot(token, { polling: true });
        this.groupId = '-1002060577009';
    }
    sendMessage(message){
        console.log("Message:",message);
        return this.bot.sendMessage(this.groupId, message);
    }
    startEcar(){
        this.bot.onText(/\/parse (.+)/, async (msg, match) => {
            const chatId = msg.chat.id;
            const link = match[1];
            if (!isLink(link)) {
                this.bot.sendMessage(chatId,`${link} это не ссылка.`);
                return;
            }
            try{
                this.bot.sendMessage(chatId,`Загрузка...`);
                const result = await parseEcarLink(link);
                const id =  parseId(result.link);
                await writeData([result],'auctions');
                this.bot.sendMessage(chatId,`https://orient-trade.ru/carpage/${id}`);

            }catch(e){
                console.error(e);
                this.bot.sendMessage(chatId, `Произошла ошибка: ${e}.`);
            }
        });
    }
}
module.exports = Telegram;