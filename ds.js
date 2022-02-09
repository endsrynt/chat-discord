const delay = require('delay');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
var random = require('random-name');
var randomize = require('randomatic');
const fs = require('fs-extra');
const readline = require("readline-sync");

(async () => {
    var lemail = readline.question('[?] Email : ')
    var lpwd = readline.question('[?] Passwaoard : ')
    var linkserver = readline.question('[?] Link Server Discord : ')

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
      });

      const optionselector = {
        setTimeout : 90000,
      };

      const optionlink = {
        waitUntil : 'domcontentloaded',
        setTimeout : 0,
      };

      const page = await browser.newPage();

      await page.goto('https://discord.com/login',optionlink)

      const email = await page.waitForXPath(`//input[@name='email']`)
      await email.click()
      await email.type(lemail)
      const pwd = await page.waitForXPath(`//input[@name='password']`)
      await pwd.click()
      await pwd.type(lpwd)
      const login = await page.waitForXPath(`//button[@type='submit']`)
      await login.click()

      const logsukses = await page.waitForXPath(`//input[@placeholder='Search']`,optionselector)
      const username1 = await page.$eval('#app-mount > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div > div > div > div.sidebar-1tnWFu > section > div.container-YkUktl > div.nameTag-sc-gpq.canCopy-IgTwyV > div.colorStandard-21JIj7.size14-3fJ-ot.usernameContainer-3PPkWq > div',(el) => el.innerText);
      const username2 = await page.$eval('#app-mount > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div > div > div > div.sidebar-1tnWFu > section > div.container-YkUktl > div.nameTag-sc-gpq.canCopy-IgTwyV > div.size12-oc4dx4.subtext-2HDqJ7',(el) => el.innerText);
      const username = `${username1}${username2}`
      console.log(`Username : ${username}`)
      await page.goto(linkserver, optionlink)

      await delay(10000)
      while(true){
        const fileKata = fs.readFileSync(`./kata.txt`, 'utf-8');
        const splitFileKata = fileKata.split('\r\n');
        var kata = splitFileKata[Math.floor(Math.random()*splitFileKata.length)];

        const chatbox = await page.waitForXPath(`//div[@data-slate-object='block']`,optionselector)
        await chatbox.type(kata)
        await page.keyboard.press('Enter')
        console.log(`Chat : ${kata}`)
        
        await delay(2000)
        await page.waitForSelector('#app-mount > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div > div > div > div.chat-2ZfjoI > div > main > form > div.typing-2J1mQU.base-3bcbY3 > div',optionselector)
        let element = await page.$('#app-mount > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div > div > div > div.chat-2ZfjoI > div > main > form > div.typing-2J1mQU.base-3bcbY3 > div')
        let count = await page.evaluate(el => el.textContent, element)
        var counts = (Number(count.split(':')[0])*60000+Number(count.split(':')[1])*1000)+35000;
        countdown = Number(counts)/1000;
        console.log(`Delay : ${countdown} Second`)
        await delay(counts)
        

        
        }
})();