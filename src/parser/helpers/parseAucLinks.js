
const getVendors = require('./getVendors');
const sendLinksPageRequest = require('./sendLinksPageRequest');
const parseAucLinks = async function(page){
    const vendors = await getVendors(page);
    const result = [];
    console.time('Links parsing...');
    let i = 0;
    for (let id of Object.keys(vendors)) {
        let pageNumber = 1;
        while (pageNumber <= 10000) {
            const data = await sendLinksPageRequest(page, pageNumber, id);
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
                car.title = obj.b;
                car.body = obj.j;
                car.transmission = obj.k;
                car.equipment = obj.m;
                car.lastBet = obj.s;
                car.lot = obj.c;
                if (!obj.v){
                    car.status = obj.t;
                }else{
                    car.status = obj.v;
                }
                car.date = obj.e;


                result.push(car);

            });
            if (i%10 === 0){
                console.log(`Parsing links for ${vendors[id]} page number ${pageNumber}. Got ${data.body.length} objects. ${i+1}`);
            }
            pageNumber++;
            i++;
        }
    }
    console.log('Total number of cars:', result.length);
    console.timeEnd('Links parsing...');
    return result;

};
module.exports = parseAucLinks;