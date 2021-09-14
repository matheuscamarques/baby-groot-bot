
const { Client, Intents } = require('discord.js')
const Ytdl = require('ytdl-core')
const puppeteer = require('puppeteer');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const TOKEN = 'NzMwMTM2NTEwNjYxMTMyMzE5.XwTGnQ.4yYbzD_mruAQ6XsFCTqvtNr5U9g';



// Fala ai >D

const app = new Client({ intents: [Intents.FLAGS.GUILDS] })


let BotOnChannelVoice = false;

app.on('ready', (msg) => {
    console.log('READY :D')
   
   

})




app.on('message', (message) => {
    console.log("ping")
    matchPattern(message)
})


app.login(TOKEN);


https://discord.com/api/oauth2/authorize?client_id=730136510661132319&permissions=8&scope=bot
/**
* msg is  Discord.Message
* @param {{msg Discord.Message}}
 */
function matchPattern(msg) {
    if (!msg.member.voiceChannel) {
        msg.channel.send("Vai para um cannal de voz seu fdp! , não fode")
        return
    }

    if (msg.content.indexOf("/play ") >= 0) {
        return commandos["/play"](msg)
    }
    return commandos[pattern](msg)
}


const commandos = {
    '/join': async (msg) => {
        msg.member.voiceChannel.join()
        BotOnChannelVoice = true;
    },
    '/leave': async (msg) => {
        msg.member.voiceChannel.leave()
        BotOnChannelVoice = false;
    },
    '/play': async (msg) => {
        let query = msg.content('/play ', '');
        let api = "https://www.youtube.com/results?search_query=" + query
        //document.getElementById('video-title')['__shady_native_parentElement']['href']
        let ytUrl = ''
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(api);
                await page.screenshot({ path: '/search/busca.png' }); await browser.close();

                const ytUrl = await page.evaluate(() => {
                    return document.getElementById('video-title')['__shady_native_parentElement']['href']
                })
            })();

        console.log(ytUrl)
        Ytdl.validateURL(ytUrl)
    }
}