const { makeid } = require('./gen-id');
const express = require('express');
const QRCode = require('qrcode');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");
const axios = require('axios');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    
    async function GIFTED_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/' + id);
        try {
            var items = ["Safari"];
            function selectRandomItem(array) {
                var randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }
            var randomItem = selectRandomItem(items);
            
            let sock = makeWASocket({
                auth: state,
                printQRInTerminal: false,
                logger: pino({
                    level: "silent"
                }),
                browser: Browsers.macOS("Desktop"),
            });
            
            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect,
                    qr
                } = s;
                if (qr) await res.end(await QRCode.toBuffer(qr));
                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    
                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let randomText = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }
                    
                    const randomText = generateRandomText();
                    try {
                        const base64Session = Buffer.from(data.toString()).toString('base64');
                        let md = "SOLO-LEVELING~" + base64Session;
                        let code = await sock.sendMessage(sock.user.id, { text: md });
                        
                        let cap = `┏━━━━━━━━━━━━━━
┃SOLO-LEVELING MD SESSION IS 
┃SUCCESSFULLY
┃CONNECTED ✅
┗━━━━━━━━━━━━━━━
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *_CREATED BY = ᴅ.ʀᴜᴋꜱʜᴀɴ ( ʀᴇᴅ ꜱᴀᴍᴜʀᴀʏ🐉)_*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *WHATSAPP CHANNEL = https://whatsapp.com/channel/0029VbAWWH9BFLgRMCXVlU38*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *STORS CHANNEL = https://whatsapp.com/channel/0029Vb6bvvP9cDDc8TRTzm41*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *TELEGRAM = https://t.me/legion_of_doom_2050*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬

🐉 *ABOUT = 私がこのプログラムを始めた理由は、SOLO-LEVELING アニメのためです。🇯🇵*
🐉 *THANK ALL PEPPERS🎗️*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬

> ® ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʀᴜᴋꜱʜᴀɴ ʟᴏᴅ ᴛᴇᴍ
⚠️ *NEVER SHARE YOUR SESSION ID WITH ANYONE!*
`;
                    await sock.sendMessage(sock.user.id, {
                        text: cap,
                        contextInfo: {
                            externalAdReply: {
                                title: "SOLO-LEVELING SESSION SUCCESSFUL 📬",
                                thumbnailUrl: "https://files.catbox.moe/nm3kqp.jpeg",
                                sourceUrl: "https://solo-leveling-mine-web-x.vercel.app/",
                                mediaType: 2,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                            },
                        },
                    }, { quoted: code });
                    } catch (e) {
                        let ddd = await sock.sendMessage(sock.user.id, { text: e.toString() });
                       let cap = `┏━━━━━━━━━━━━━━
┃SOLO-LEVELING MD SESSION IS 
┃SUCCESSFULLY
┃CONNECTED ✅
┗━━━━━━━━━━━━━━━
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *_CREATED BY = ᴅ.ʀᴜᴋꜱʜᴀɴ ( ʀᴇᴅ ꜱᴀᴍᴜʀᴀʏ🐉)_*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *WHATSAPP CHANNEL = https://whatsapp.com/channel/0029VbAWWH9BFLgRMCXVlU38*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *STORS CHANNEL = https://whatsapp.com/channel/0029Vb6bvvP9cDDc8TRTzm41*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *TELEGRAM = https://t.me/legion_of_doom_2050*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬

🐉 *ABOUT = 私がこのプログラムを始めた理由は、SOLO-LEVELING アニメのためです。🇯🇵*
🐉 *THANK ALL PEPPERS🎗️*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬

> ® ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʀᴜᴋꜱʜᴀɴ ʟᴏᴅ ᴛᴇᴍ
⚠️ *NEVER SHARE YOUR SESSION ID WITH ANYONE!*
`;
                    await sock.sendMessage(sock.user.id, {
                        text: cap,
                        contextInfo: {
                            externalAdReply: {
                                title: "SOLO-LEVELING SESSION SUCCESSFUL 📬",
                                thumbnailUrl: "https://files.catbox.moe/nm3kqp.jpeg",
                                sourceUrl: "https://solo-leveling-mine-web-x.vercel.app/",
                                mediaType: 2,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                            },
                        },
                    }, { quoted: ddd });
                    }
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...`);
                    await delay(10);
                    process.exit();
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restarted", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
    await GIFTED_MD_PAIR_CODE();
});

setInterval(() => {
    console.log("☘️ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...");
    process.exit();
}, 180000);

module.exports = router;
