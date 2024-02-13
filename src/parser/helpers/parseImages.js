const parsePage = require('./parsePage');
const parseImages = async function(page, data){
    console.time('Parsing Images...');
    const result = [];
    let errorCount = 0;
    for (let i=0; i<data.length; i++) {
        try{
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

        }catch(e){
            console.log(e);
            errorCount++;
            if (errorCount>20) return result;
        }

    }
    console.timeEnd('Parsing Images...');
    return result;
    
};
module.exports = parseImages;