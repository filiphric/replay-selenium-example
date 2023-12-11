const { Builder, Browser, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function test() {
  let options = new chrome.Options();
  options.setChromeBinaryPath(process.env.REPLAY_BROWSER_PATH);

  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

    try {
      await driver.get('http://localhost:3000');
      await driver.findElement(By.xpath("//*[text()='Add to Cart']")).click();
      await driver.wait(until.elementLocated(By.xpath("//*[text()='Product added to cart!']")), 5000);
    } finally {
      await driver.quit();
    }
})();