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
    await page.waitForSelector('app-lot-main-info');
    const link = `https://jpcenter.ru/aj-${generateUniqueIdFromString(_link)}_e.htm`;
    const data = await page.evaluate(() => {
        const result = {};

        const lotInfoSection = document.querySelector('app-lot-main-info> section:first-child');
        
        result['Name'] = lotInfoSection.querySelector('nz-row > nz-col:nth-child(1)')?.textContent;
        result['Year'] = lotInfoSection.querySelector('nz-row > nz-col:nth-child(7)')?.textContent;
        result['Color'] = lotInfoSection.querySelector('nz-row > nz-col:nth-child(2)')?.textContent;
        result['Engine cc'] = lotInfoSection.querySelector('nz-row > nz-col:nth-child(8)')?.textContent;
        result['Chassis ID'] = lotInfoSection.querySelector(' nz-row > nz-col:nth-child(4)')?.textContent;
        result['Mileage'] = lotInfoSection.querySelector(' nz-row > nz-col:nth-child(5)')?.textContent;
        result['Model grade'] = lotInfoSection.querySelector('nz-row > nz-col:nth-child(9)')?.textContent;
        result['Score'] = lotInfoSection.querySelector('nz-row > nz-col:nth-child(3)')?.textContent;

        const auctionSection = document.querySelector('app-lot-main-info> section:nth-child(2)');

        result['Auction'] = auctionSection.querySelector('nz-row > nz-col:nth-child(1) > app-lot-auction-name > main > section')?.textContent;
        result['Auction date'] = auctionSection.querySelector('nz-row > nz-col:nth-child(3)')?.textContent;

        const bidsSection = document.querySelector('app-lot-main-info> section:last-child');
        
        result["Start price"] = bidsSection.querySelector('nz-row > nz-col.ant-col.ant-col-xs-24 > nz-row > nz-col.ant-col.ant-col-xs-12.ant-col-sm-12.ant-col-md-16 > nz-row > nz-col:nth-child(1)')?.textContent;
        console.log(result)
        return result
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
    for (let [key,value] of Object.entries(data)){
        value = value.trim();
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
    console.log(result);
    return result;


};
module.exports = parsePage;