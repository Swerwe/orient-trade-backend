//const safeEval = require('safe-eval');
function generate9DigitInteger() {
    return Math.floor(100000000 + Math.random() * 900000000);
}

const sendAucPageRequest = async function (page,pageNumber,modelName,vendorId) {
    const ajxId = generate9DigitInteger();
    const html = await page.evaluate(async (pageNumber,modelName,vendorId,ajxId) =>{
        const response = await fetch(`https://jpcenter.ru/st?file=loader&Q=${modelName.replaceAll(' ','%')}&ajx=17071${ajxId}-form`, {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              "accept-language": "ru,en;q=0.9",
              "cache-control": "max-age=0",
              "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryXCxFbnJYTgU3gSDo",
              "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"YaBrowser\";v=\"24.1\", \"Yowser\";v=\"2.5\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"macOS\"",
              "sec-fetch-dest": "iframe",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1"
            },
            "referrer": "https://jpcenter.ru/japan_st",
            "referrerPolicy": "strict-origin-when-cross-origin",
            // eslint-disable-next-line no-useless-escape
            "body": `"------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"url_loader\"\r\n\r\nst?file=loader&Q=${modelName}\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"page\"\r\n\r\n${pageNumber}\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"sort_ord\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"url_luboy\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"url_lubaya\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"lose_time_here_buT_not_buy_servlce_for_100_usd_monthly_here_http_avto_jp\"\r\n\r\nhttp://avto.jp/specification.html\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"tpl\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"edit_post\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"is_stat\"\r\n\r\n0\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"vendor\"\r\n\r\n${vendorId}\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"model\"\r\n\r\n${modelName}\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"bid\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"kuzov\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"rate\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"status\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"kpp_add\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"colour\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"auct_name\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_day\"\r\n\r\n1\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_rate\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_status\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_kpp_add\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_auct_name\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"list_size\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_list_size\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"lhw\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"eqqp\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"stDt1\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"stDt2\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"year\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"year2\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"probeg\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"probeg2\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"eng_v\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"eng_v2\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"price_start\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"price_start2\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"price_finish\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"price_finish2\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_year\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_year2\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_probeg\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_probeg2\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_eng_v\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_eng_v2\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_price_start\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_price_start2\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_price_finish\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo\r\nContent-Disposition: form-data; name=\"_price_finish2\"\r\n\r\n\r\n------WebKitFormBoundaryXCxFbnJYTgU3gSDo--\r\n"`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
          });
        const buffer = await response.arrayBuffer();
        const html = new TextDecoder('windows-1251').decode(buffer);
        return html;
    },pageNumber,modelName,vendorId,ajxId);
    const match = html.match(/'tpl_poisk': '([^']+)'/);
    const left = html.indexOf('var data = ');
    const right = html.lastIndexOf(`', 'js_1'`);  
    if (left === -1 || right === -1) {
        console.log(`Empty page for  ${modelName}`);
        return null;
    }
    if (match) {
        try{
            //eval(match[1].replace(/\\/g,''));
            eval(html.slice(left,right).replace(/\\/g,''));
            // eslint-disable-next-line no-undef
            return data;

        }catch(e){
            console.log(`Token error with ${pageNumber} page number and ${modelName} vendorId`);
            console.log(left,right);
            return null;
        }


    }else{
        if (html.includes('503 Service Temporarily Unavailable'))
         {
            console.log(`503 with ${pageNumber} page number and ${modelName} vendorId`);
            console.log(ajxId);
         }
        return null;
    }
    



};
module.exports = sendAucPageRequest;