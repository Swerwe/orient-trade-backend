const crypto = require('crypto');

function generateUniqueIdFromString(str) {
    const hash = crypto.createHash('sha256').update(str).digest('hex');

    const uniqueId = hash.substring(0, 15);

    return uniqueId;
}
function parseNumberFromString(str) {
    const matches = str.match(/-?\d+\.?\d*/g); // This regex matches integers and floating-point numbers

    if (!matches) {
        return NaN; // Return NaN if no numeric values are found
    }

    // Parse each matched value into a number and return the first one
    return parseFloat(matches[0]);
}

const parsePage = async function(page,_link){
    await page.goto(_link);
    await page.waitForSelector('app-lot-title-full h2');
    await page.waitForSelector('table >tbody > tr:nth-child(6) > td:nth-child(4) > span');
    const title = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const rate = tables[0].querySelector('tbody > tr:nth-child(1) > td:nth-child(2)').textContent;
        return rate.trim();
    });
    
    const link = `https://jpcenter.ru/aj-${generateUniqueIdFromString(title)}_e.htm`;

    const rate = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const rate = tables[0].querySelector('tbody > tr:nth-child(6) > td:nth-child(4) > span').textContent;
        return rate.trim();
    });
    const equipment = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const equipment = tables[0].querySelector('tbody > tr:nth-child(3) > td:nth-child(4)').textContent;
        return equipment.trim();
    });
    const year = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const year = tables[0].querySelector('tbody > tr:nth-child(2) > td:nth-child(4)').textContent;
        return year.trim();
    });
    const capacityStr = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const capacity = tables[0].querySelector('tbody > tr:nth-child(4) > td:nth-child(4)').textContent;
        return capacity;
    });
    const capacity = parseNumberFromString(capacityStr);
    const transmission = '';
    const body = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const body = tables[0].querySelector('tbody > tr:nth-child(3) > td:nth-child(2) > span').textContent;
        return body.trim();
    });
    const mileage = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const mileage = tables[0].querySelector("tbody > tr:nth-child(5) > td:nth-child(2)").textContent;
        return mileage.trim();
    });
    const auction = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const body = tables[0].querySelector('tbody > tr:nth-child(1) > td:nth-child(4) > app-lot-auction-name > main > section').textContent;
        return body.trim();
    });
    const lotString = await page.evaluate(() => {
        const lot = document.querySelector('app-lot-title h3').textContent;
        return lot.trim();
    });
    const lot = parseNumberFromString(lotString);
    const status = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const status = tables[0].querySelector('tbody > tr:nth-child(5) > td:nth-child(4)').textContent;
        return status.trim();
    });
    
    const date = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const date = tables[0].querySelector('tbody > tr:nth-child(2) > td:nth-child(2)').textContent;
        return date.trim();
    });
    
    const startPrice = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const startPrice = tables[0].querySelector('tbody > tr:nth-child(7) > td:nth-child(2)').textContent;
        return startPrice.trim();
    });
    const resultPrice = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const resultPrice = tables[0].querySelector('tbody > tr:nth-child(8) > td:nth-child(2) > span').textContent;
        return resultPrice.trim();
    });
    const lastBet = resultPrice || startPrice;

    const pageImages = await page.evaluate(() => {
        const pageImages = [];
        document.querySelectorAll('div.thumbs .thumb img').forEach(el => {
            pageImages.push(el.src);
        });
        return pageImages;
    });
    return {
        title,
        link,
        rate,
        equipment,
        year,
        capacity,
        transmission,
        body,
        mileage,
        auction,
        lot,
        status,
        date,
        lastBet,
        pageImages

    };
};
module.exports = parsePage;