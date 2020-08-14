/**
 * Copyright (c) 2020 Wakers.cz
 * @author Jiří Zapletal (https://www.wakers.cz, zapletal@wakers.cz)
 */

const fs = require('fs');
const dir = `${__dirname}/../../apify_storage/datasets/`;
const data = { prospects: [] };

const listDirectory = async ({ directory }) => {
    return fs.readdirSync(directory);
}

const mergeProspects = async ({ folder }) => {
    const prospectPath = dir + folder;
    const files = await listDirectory({ directory: prospectPath});

    for (const file of files) {
        let json = require(`${prospectPath}/${file}`);
        data.prospects.push(json.result);
    }

    fs.writeFileSync(`${dir}../results/${folder}.json`, JSON.stringify(data.prospects, null, 2));
};

(async () => {
    const folders = await listDirectory({directory: dir});
    for (const folder of folders) {
        if (folder !== '.gitignore') {
            await mergeProspects({ folder: folder });
        }
    }
})();