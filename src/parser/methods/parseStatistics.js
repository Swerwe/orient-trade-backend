const login = require('../helpers/login');
const parseStatLinks = require('../helpers/parseStatLinks');
const writeData = require('../../sql/writeData');
//const fs = require('fs').promises;

const parseStatistics = async function (puppeteer) {
    const browser = await puppeteer.launch({ headless: false });
    const page =  await login(browser);
    const data = await parseStatLinks(page);
    //await fs.writeFile('statistics.json', JSON.stringify(data));
    //const data = JSON.parse(await fs.readFile('statistics.json','utf-8'));
    await writeData(data,'statistics');
    await browser.close();

};
module.exports = parseStatistics;