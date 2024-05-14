require('dotenv').config()

const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
    webVersionCache:
    {
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2402.5-beta.html',
        type: 'remote'
    },
    puppeteer: {
        args: ['--no-sanbox'],
    },
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
                `Halo! Terima kasih telah menghubungi kami. Pesan Anda akan diteruskan kepada tim terkait. Harap pastikan untuk memperbarui aplikasi, memeriksa kamera, dan koneksi internet Anda sebelum menggunakan QR Scanner. Harap bersabar, kami akan segera memberikan tanggapan atau solusi yang sesuai. Terima kasih atas pengertiannya. 🙏\n\nKode QR: ${code}`
            );

            redirectMessage(msg.body, process.env.PUBLIC_DIRECT_NUMBER, client);

            return;
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
