import puppeteer from 'puppeteer-core';
import {executablePath} from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    args: ['--no-sandbox',],
    headless: true,
    ignoreHTTPSErrors: true,
    executablePath: executablePath()
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://scrapingbee.com');

  try {
    // Capture screenshot and save it in the current folder:
    await page.screenshot({ path: `./scrapingbee_homepage.jpg` });

  } catch (err) {
    console.log(`Error: ${err.message}`);
  } finally {
    await browser.close();
    console.log(`Screenshot has been captured successfully`);
  }
})();
