const user = {
    username: 'alexp179',
    password: '18523293Asd@!!'
};
const login = async function (browser) {
    const page = await browser.newPage();
    await page.goto('https://ecarjp.com/sign-in');
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', user.username);
    await page.waitForSelector('input[name="password"]');
    await page.waitForTimeout(2000);
    await page.type('input[name="password"]', user.password);
    await page.waitForSelector('button.login-form-button');
    await page.waitForTimeout(2000);

    await page.click('button.login-form-button');
    await page.waitForTimeout(2000);
    return page;

};
module.exports = login;