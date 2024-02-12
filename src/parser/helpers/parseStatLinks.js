const getAllModels = require('../helpers/getAllModels');
const getVendors = require('../helpers/getVendors');
const sendAucPageRequest = require('../helpers/sendAucPageRequest');
const parseStatLinks = async function (page){
    const models = await getAllModels(page);
    const vendors = await getVendors(page);
    const result = [];
    console.time('Stats Links parsing...');
    let i = 0;
    console.log(models);
    console.log(vendors);
    for (let modelName of Object.keys(models)) {
        const {vendorId} = models[modelName];
        let pageNumber = 1;
        while (pageNumber <= 10000) {
            const data = await sendAucPageRequest(page, pageNumber, modelName,vendorId);
            if (!data) {
                break;
            }
            data.body.forEach(obj => {
                const car = {};
                car.link = `https://jpcenter.ru/aj-${obj.a}.htm`;
                car.lotNumber = obj.c;
                car.auction = obj.d;
                car.year = obj.g;
                car.rate = obj.r;
                car.mileage = obj.q;
                car.capacity = obj.h;
                car.title = `${vendors[vendorId]} ${modelName}`;
                car.body = obj.j;
                car.transmission = obj.k;
                car.equipment = obj.m;
                car.lastBet = obj.s;
                car.lot = obj.c;
                if (!obj.v){
                    car.status = obj.t;
                }else{
                    if (obj.v === '<b>продан</b>'){
                        car.status = 'продан';
                    }
                    else if (obj.v === 'не&nbsp;продан'){
                        car.status = 'не продан';
                    }else{
                        car.status = 0;
                    }
                }
                const pageImages = [];
                if (obj.x){pageImages.push(`https://11.ajes.com/imgs/${obj.x}`);}
                if (obj.y){pageImages.push(`https://11.ajes.com/imgs/${obj.y}`);}
                if (obj.z){pageImages.push(`https://11.ajes.com/imgs/${obj.z}`);}
                car.pageImages = pageImages;
                
                car.date = obj.e;

                result.push(car);

            });

            console.log(`Parsing links for ${modelName} page number ${pageNumber}. Got ${data.body.length} objects. ${i+1}`);
            pageNumber++;
            i++;
            if (i>500) return result;
        }
    }
    console.log('Total number of cars:', result.length);
    console.timeEnd('Stats Links parsing...');
    return result;
    
};
module.exports = parseStatLinks;