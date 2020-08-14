const Apify = require('apify');

Apify.main(async () => {
    const requestQueue = await Apify.openRequestQueue();
    const input = await Apify.getInput();
    const dataset = await Apify.openDataset('listing');

    for (const url of input.urls) {
        await requestQueue.addRequest({ url: url + '?page=1'});
        const pseudoUrls = [new Apify.PseudoUrl(url + '?page=[.*]')];
        const crawler = new Apify.PuppeteerCrawler({
            requestQueue,
            maxRequestsPerCrawl: 5,
            //maxRequestRetries: 0,
            maxConcurrency: 10,
            launchPuppeteerOptions: {
                useChrome: true,
                stealth: true
            },
            handlePageFunction: async ({ page, request }) => {
                await Apify.utils.puppeteer.injectJQuery(page);

                await page.waitFor('.premiseBox', { timeout: 10000 })
                const result = await page.$eval('.premiseBox', () => {
                    var data = [];
                    $('.premiseBox:not(.premAdBox)').each(function(i) {
                        var $this = $(this);
                        data.push({
                            name: $this.find('h3').text().trim(),
                            url: $this.find('h3 > a').attr('href'),
                        });
                    });

                    return data;
                });

                await page.waitFor('.premisePaging', { timeout: 10000 })
                await Apify.utils.enqueueLinks({
                    page,
                    selector: '.premisePaging a',
                    pseudoUrls,
                    requestQueue,
                });

                await dataset.pushData({ result });
                console.log(`Crawled: ${request.url}`);
            }
        });

        await crawler.run();
    }
});