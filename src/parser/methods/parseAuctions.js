//const fs = require('fs').promises;
const login = require('../helpers/login');
const parseAucLinks = require('../helpers/parseAucLinks');
const parseImages = require('../helpers/parseImages');
const writeData = require('../../sql/writeData');
const parseAuctions = async function (puppeteer) {

    const browser = await puppeteer.launch({args: ['--no-sandbox'],headless:new});
    const page =  await login(browser);
    //const data = JSON.parse(await fs.readFile('result.json', 'utf-8'));
    const data = await parseAucLinks(page);
    //await fs.writeFile('result.json', JSON.stringify(data));
    const result = await parseImages(page, data);
    //await fs.writeFile('final.json', JSON.stringify(result));
    //const result = JSON.parse(await fs.readFile('final.json', 'utf-8'));
    await writeData(result, 'auctions');
    await page.waitForTimeout(1000);
    await browser.close();


};
module.exports = parseAuctions;
