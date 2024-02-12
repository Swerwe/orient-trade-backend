const cheerio = require('cheerio');
const parseModels = function (html){
    const $ = cheerio.load(html);
    const modelsString = $('#model_str').text();
    const result = {};
    modelsString.split(';').forEach(function (str) {
        const [vendorId, modelString] = str.split(':');
        if (vendorId === '0'){
          return;
        }
        const {modelName,count} = parseModelAndCount(modelString);
        if (!count) return;
        if (modelName.startsWith('OTHER')) return;
        result[modelName] = {count,vendorId};
      });
    return result;
};
function parseModelAndCount(inputString) {
    const regex = /(.+)\s\((\d+)\)/;
    const match = inputString.match(regex);
  
    if (match) {
        const modelName = match[1].trim();
        const count = parseInt(match[2], 10);
        return { modelName, count };
    } else {
        return {};
    }
  }
const getAllModels = async function(page){
    const html = await page.evaluate(async () =>{
        const response = await fetch("https://jpcenter.ru/japan_st", {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              "accept-language": "ru,en;q=0.9",
              "cache-control": "max-age=0",
              "sec-ch-ua": "\"Chromium\";v=\"118\", \"YaBrowser\";v=\"23.11\", \"Not=A?Brand\";v=\"99\", \"Yowser\";v=\"2.5\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"macOS\"",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1"
            },
            "referrer": "https://jpcenter.ru/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
          });
        return await response.text();
    });
    const models = parseModels(html);
    return models;
};
module.exports = getAllModels;