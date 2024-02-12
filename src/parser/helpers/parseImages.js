const parsePage = require('./parsePage');
const parseImages = async function(page, data){
    console.time('Parsing Images...');
    const result = [];
    for (let i=0; i<data.length; i++) {
        let obj = data[i];
        const imageLinks = await parsePage(page, obj.link);
        if (imageLinks.length === 0) continue;
        result.push({
            ...obj,
            pageImages: imageLinks,
        });
        if (i%10 === 0) {
            console.log(`Got ${imageLinks.length} images for ${obj.link}. [${i+1}/${data.length}]`);
        }
    }
    console.timeEnd('Parsing Images...');
    return result;
    
};
module.exports = parseImages;