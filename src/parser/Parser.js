const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const parseAuctions = require('./methods/parseAuctions');
const parseStatistics = require('./methods/parseStatistics');
class Parser {
    constructor() {
        this.puppeteer = puppeteer;
        this.puppeteer.use(stealthPlugin());
    }
    parseAuctions() {
        return parseAuctions(this.puppeteer);

    }
    parseStatistics() {
        return parseStatistics(this.puppeteer);
    }
}

module.exports = Parser;