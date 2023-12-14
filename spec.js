import { Builder, Browser, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';
import { getPlaywrightBrowserPath } from "@replayio/replay";
const chromiumPath = getPlaywrightBrowserPath("chromium");

(async function test() {
  let options = new Options();
  options.setChromeBinaryPath(chromiumPath);
  options.headless()

  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

    try {
      await driver.get('http://localhost:3000');
      await driver.sleep(2000)
      await driver.findElement(By.xpath("//*[text()='Add to Cart']")).click();
      await driver.wait(until.elementLocated(By.xpath("//*[text()='Product added to cart!']")), 5000);
    } finally {
      await driver.quit();
    }
})();