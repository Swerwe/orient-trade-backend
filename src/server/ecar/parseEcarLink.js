const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const login = require('./login');
const parsePage = require('./parsePage');
const parseEcarLink = async function (link){
    puppeteer.use(stealthPlugin());
    const browser = await puppeteer.launch({args: ['--no-sandbox'], headless:'new'});
    const page =  await login(browser);
    const result = await parsePage(page,link);
    await page.waitForTimeout(2000);
    await browser.close();
    console.log(result);
    return result;


};
//parseEcarLink('https://ecarjp.com/auto/lot/Uz8KYHr6v6brSo');

module.exports = parseEcarLink;