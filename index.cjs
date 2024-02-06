const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Client is ready!");
});

client.on("message", async (msg) => {
    try {
        if (isReportMessage(msg.body)) {
            const parts = msg.body.split(":");
            const code = parts[1].trim();

            await msg.reply(
                `Terimakasih atas laporannya. Laporan atas kode ${code} akan segera Kami investigasi dan tindak lanjuti. Mohon maaf atas ketidaknyamanannya 🙏.`
            );

            redirectMessage(msg.body, process.env.PUBLIC_DIRECT_NUMBER, client);
        }

        if (msg.body == "ping") {
            await msg.reply("pong");
        }
    } catch (error) {
        console.log(error);
    }
});

client.initialize();

function redirectMessage(text, number, client) {
    // add "@c.us" at the end of the number.
    const chatId = number + "@c.us";

    client.sendMessage(chatId, text);
}

function isReportMessage(text) {
    const reportPattern = "Saya Menemukan Kode QR yang error berikut kodenya :";
    const result = text.startsWith(reportPattern) ? true : false;
    return result;
}
