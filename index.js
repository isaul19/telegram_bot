require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const botToken = process.env.BOT_TOKEN;

const bot = new TelegramBot(botToken, { polling: true });

const buildResponse = (status, message) => {
    return {
        statusCode: status,
        body: JSON.stringify({
            message: message,
        }),
    };
};

// "chat_id" - chat with which you start the bot in telegram
// notification - message you want to send
// bot: https://web.telegram.org/a/#6374326254

exports.handler = async (event, context) => {
    const { chat_id, notification } = JSON.parse(event.body);
    if (!chat_id) return buildResponse(500, "No se encontró el chat_id");

    bot.sendMessage(+chat_id, notification);
    return buildResponse(200, "Mensaje enviado");
};
