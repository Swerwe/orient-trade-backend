const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const login = require('./login');
const parsePage = require('./parsePage');
const parseEcarLink = async function (link){
    puppeteer.use(stealthPlugin());
    const browser = await puppeteer.launch();
    const page =  await login(browser);
    const result = await parsePage(page,link);
    await page.waitForTimeout(2000);
    await browser.close();
    console.log(result);
    return result;


};
//parseEcarLink('https://ecarjp.com/auto/lot/ly8XN0E471z9iso');
module.exports = parseEcarLink;