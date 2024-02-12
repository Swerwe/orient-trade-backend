const Parser = require('./parser/Parser');

async function main() {
    const parser = new Parser();
    //await parser.parseAuctions();
    await parser.parseStatistics();
}
main();