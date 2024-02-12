const cheerio = require('cheerio');
const parsePage = async function (page, link) {
    console.log(link);
    const imageLinks = [];
    const html = await page.evaluate(async (link) => {
        const response = await fetch(link, {
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
            "referrer": "https://jpcenter.ru/japan",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        return await response.text();
    }, link);
    const $ = cheerio.load(html);
    const images = $('a.aj_resize');
    images.each((i,obj) => {
        imageLinks.push(obj.attribs.href);
    });
    return imageLinks;

};
module.exports = parsePage;