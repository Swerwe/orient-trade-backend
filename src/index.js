const Parser = require('./parser/Parser');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function main() {
    const parser = new Parser();
    // eslint-disable-next-line no-constant-condition
    while (true){
        await parser.parseAuctions();
        await parser.parseStatistics();
        console.log('Finished parsing, witing 1hr...');
        await sleep(3600000);
    }

}
main();