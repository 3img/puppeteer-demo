const puppeteer = require('puppeteer');
const { sleep } = require('./help');

/**
 * 爬虫任务
 */
const start = async function() {

    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        defaultViewport:null,
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
    });
    
    const page = await browser.newPage();

    process.on("unhandledRejection", (reason, p) => {
        console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
        browser.close();
        process.kill(process.pid);
    });

    // page.setDefaultNavigationTimeout(60);
    await sleep(1000);
    await page.goto('https://www.163.com/');

    //打开页面出错
    page.on('error',res=>{
        console.log(`${process.pid}打开页面出错...`);
        process.kill(process.pid);
    });

    console.log('------开始爬取-------');
    //页面加载完成
    let data = await page.evaluate(getContent);
    process.send(data);
    await browser.close();
    process.kill(process.pid);
};


/**
 * 获取最新的100IV内容
 * @return {[type]} [description]
 */
function getContent() {
    
    return new Promise((resolve, reject) => {
        let links = document.querySelectorAll('.yaowen_news a');
        let _arr = []
        links.forEach((link,index) => {
            _arr.push(link.innerText);
        })
        resolve(_arr)
    })
}

exports.start = start;