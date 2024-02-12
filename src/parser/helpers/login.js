const user = {
    username: 'lamn112',
    password: 'cHF-C25-kZv-Udb'
};
const login = async function (browser) {
    const page = await browser.newPage();
    await page.goto('https://jpcenter.ru/login');
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', user.username);
    await page.waitForSelector('input[name="password"]');
    await page.waitForTimeout(2000);
    await page.type('input[name="password"]', user.password);
    await page.waitForSelector('input.ajneo3');
    await page.waitForTimeout(2000);

    await page.click('input.ajneo3');
    await page.waitForTimeout(2000);
    await page.goto('https://jpcenter.ru/');
    return page;

};
module.exports = login;