/**
 * The function redirects a message to a specified WhatsApp number using the Twilio API.
 * @param {string} text - The `text` parameter is a string that represents the message content that you want to
 * send. It can be any text or message that you want to redirect.
 * @param {number} number - The `number` parameter is the phone number to which the message will be redirected.
 * It should be in the format like "62857...".
 * @param {Object} client - The `client` parameter is an object that represents the connection to the messaging
 * platform. It is used to send messages to the specified chatId.
 */
function redirectMessage(text, number, client) {
    // add "@c.us" at the end of the number.
    const chatId = number + "@c.us";

    client.sendMessage(chatId, text);
}

export default redirectMessage;