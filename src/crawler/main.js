/**
 * Copyright (c) 2020 Wakers.cz
 * @author Jiří Zapletal (https://www.wakers.cz, zapletal@wakers.cz)
 */

const Apify = require('apify');
const { listing, detail } = require('./route')

Apify.main(async () => {
    const requestQueue = await Apify.openRequestQueue();
    const input = await Apify.getInput();

    for (const url of input.urls) {
        const dataset = await Apify.openDataset('prospects_' + (new Date()).getTime());
        await requestQueue.addRequest({ url: url + '?page=1'});
        const pseudoUrls = [new Apify.PseudoUrl(url + '?page=[.*]')];
        const crawler = new Apify.PuppeteerCrawler({
            requestQueue,
            //maxRequestsPerCrawl: 30,
            //maxRequestRetries: 0,
            maxConcurrency: 10,
            launchPuppeteerOptions: {
                useChrome: true,
                stealth: true
            },
            handlePageFunction: async ({ page, request }) => {
                //await Apify.utils.sleep(3 * 1000); // simulate delay
                await Apify.utils.puppeteer.injectJQuery(page);

                if (request.url.indexOf('/detail/') !== -1) {
                    return detail({ page, request, dataset });
                } else {
                    return listing({ page, request, requestQueue, pseudoUrls });
                }
            }
        });

        await crawler.run();
    }
});