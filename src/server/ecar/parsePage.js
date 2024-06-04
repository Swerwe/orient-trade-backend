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
    await page.waitForSelector('app-lot-title-full h1');
    await page.waitForSelector('div.ant-descriptions-view > table >tbody');
    const link = `https://jpcenter.ru/aj-${generateUniqueIdFromString(_link)}_e.htm`;
    const data = await page.evaluate(() => {
        const body = document.querySelector('div.ant-descriptions-view > table >tbody');
        const result = {};
        for (let row of Array.from(body.children)){
            const cells = Array.from(row.children);
            for (let i = 0; i<cells.length; i=i+2){
                const name = cells[i].textContent.trim();
                let content;
                switch (name){
                    case 'Auction':
                        content = cells[i+1].querySelector('app-lot-auction-name').textContent;
                        break;
                    case 'Countdown to finish':
                        content = cells[i+1].querySelector('span').textContent;
                        break;
                    default:
                        content = cells[i+1].textContent.trim();
                        break;    
                }
                result[name] = content;
            
            }
                 
        }
        return result;
    });
    const lotString = await page.evaluate(() => {
        const lot = document.querySelector('app-lot-title h3').textContent;
        return lot.trim();
    });
    const lot = parseNumberFromString(lotString);
    const translateAudio = await page.evaluate(() =>{
        const audioSrc = document.querySelector('audio')?.src;
        if (audioSrc) return audioSrc;
        return '';
    });
    const translateText = await page.evaluate(() =>{
        const translations = document.querySelector('app-lot-translations');
        if (!translations) return '';
        const translateText = Array.from(translations.querySelectorAll('p')).map(x => x.textContent).join(' ');
        return translateText;
    });
    const pageImages = await page.evaluate(() => {
        const pageImages = [];
        document.querySelectorAll('div.thumbs .thumb img').forEach(el => {
            pageImages.push(el.src);
        });
        return pageImages;
    });
    const result = {link,translateAudio,translateText,pageImages,lot};
    for (const [key,value] of Object.entries(data)){
        switch(key){
            case 'Name':
                result.name = value;
                break;
            case 'Year':
                result.year = value;
                break;
            case 'Color':
                result.color = value;
                break;
            case 'Start price':
                result.startPrice = value;
                break;
            case 'Auction':
                result.auction = value;
                break;
            case 'Chassis ID':
                result.body = value;
                break;
            case 'Engine cc':
                result.engine = value;
                break;
            case 'Auction date':
                result.auctionDate = value;
                break;
            case 'Model grade':
                result.complectation = value;
                break;
            case 'Mileage':
                result.mileage = value;
                break;
            case 'Score':
                result.rate = value;
                break;
            case 'Production date':
                result.productionDate = value;
                break;
        }
    }
    return result;


};
module.exports = parsePage;