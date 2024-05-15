import qrcode from "qrcode-terminal";
import WAWebJS from "whatsapp-web.js";
import redirectMessage from "./src/lib/utils/redirectMessage.js";
import isReportMessage from "./src/lib/utils/validateReportMessage.js";

const { generate } = qrcode;
const { Client, LocalAuth } = WAWebJS;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ["--no-sandbox"],
    },
});

client.on("qr", (qr) => {
    generate(qr, { small: true });
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
