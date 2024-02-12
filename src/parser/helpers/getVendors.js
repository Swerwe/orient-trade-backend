const cheerio = require('cheerio');
const parseVendors = function (html) {
  const $ = cheerio.load(html);
  const vendorsString = $('#manuf_str').text();
  const result = {};
  vendorsString.split(';').forEach(function (str) {
    const [vendor, id] = str.split(':');
    if (vendor === '0') return;
    result[vendor] = id;
  });
  return result;
};

const getVendors = async function (page) {
  const html = await page.evaluate(async () => {
    const response = await fetch("https://jpcenter.ru/japan", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "ru,en;q=0.9",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"YaBrowser\";v=\"24.1\", \"Yowser\";v=\"2.5\"",
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
  const vendors = parseVendors(html);
  return vendors;
};
module.exports = getVendors;
