/**
 * Copyright (c) 2020 Wakers.cz
 * @author Jiří Zapletal (https://www.wakers.cz, zapletal@wakers.cz)
 */

const Apify = require('apify');

module.exports.listing = async ({page, request, requestQueue, pseudoUrls}) => {
    await page.waitFor('.premiseBox', { timeout: 10000 });
    const result = await page.$eval('.premiseBox', () => {
        var links = [];
        $('.premiseBox:not(.premAdBox)').each(function(i) {
            var $this = $(this);
            links.push({
                name: $this.find('h3').text().trim(),
                url: $this.find('h3 > a').attr('href'),
            });
        });
        return links;
    });

    for (const link of result) {
        await requestQueue.addRequest({ url: 'https://www.firmy.cz' + link.url });
    }

    await page.waitFor('.premisePaging', { timeout: 10000 });
    await Apify.utils.enqueueLinks({
        page,
        selector: '.premisePaging a',
        pseudoUrls,
        requestQueue,
    });

    console.log(`Listing: ${request.url}`);
}

module.exports.detail = async ({ page, request, dataset }) => {
    await page.waitFor('.detailInfo', { timeout: 10000 });
    const result = await page.$eval('.detailInfo', () => {
        var $detail = $('.detailInfo');

        var mails = '';
        $detail.find('.companyMail').each(function(i) {
            if (i > 0) { mails += ', ' }
            mails += $(this).text().trim();
        });

        var $website = $detail.find('.webUrl > a')
        var website = '';
        if ($website.length !== 0) {
            var rxp = /(.*)\#.*/;
            website = $website.attr('href').trim().replace(rxp, '$1');
        }

        return {
            name: $detail.find('h1').text().trim(),
            email: mails,
            phone: $detail.find('.primaryPhone').text().trim(),
            city: $detail.find('.sAddress > div:eq(2)').text().trim(),
            street: $detail.find('.sAddress > div:eq(0)').text().trim(),
            postalCode: $detail.find('.sAddress > div:eq(1)').text().trim(),
            website: website
        }
    });
    await dataset.pushData({ result });
    console.log(`Prospect: ${request.url}`);
}