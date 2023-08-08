import * as fs from "fs"
import * as path from "path"
let Files  = [];

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

function ThroughDirectory(Directory) {
    fs.readdirSync(Directory).forEach(File => {
        const Absolute = path.join(Directory, File);
        if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
        else return Files.push(Absolute);
    });
}


ThroughDirectory("./node_modules/@puppeteer");
ThroughDirectory("./node_modules/puppeteer");
ThroughDirectory("./node_modules/puppeteer-core");
let js_files = []
for(let i in Files) if((Files[i] + "").endsWith(".js")){js_files.push(Files[i])}
for(let i in js_files){
  let file_content = fs.readFileSync(js_files[i]) + ""
  file_content = file_content.split("??=").join("=");
  fs.writeFileSync(js_files[i], file_content)
}

console.log(Files);
console.log("-----------------------------------");
console.log(js_files);




(async () => {
  let puppeteer = await import('puppeteer-core');
  let {executablePath} = await import('puppeteer');
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
