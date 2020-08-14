# Firmy.cz crawler
Firmy.cz listing & prospecting crawler based on Apify SDK

## Be more powerful with [contactio.app](https://www.contactio.app)
After scraping - you can reach thousands of inboxes for free, just use [contactio.app](https://www.contactio.app). It's fully compatible. 


## Sample crawler output for
[https://www.firmy.cz/Remesla-a-sluzby/Remesla/Tesarstvi-pokryvacstvi-a-klempirstvi/kraj-jihocesky](https://www.firmy.cz/Remesla-a-sluzby/Remesla/Tesarstvi-pokryvacstvi-a-klempirstvi/kraj-jihocesky)

``` json
[
  {
    "name": "BOHEMIA KONSTRUKT, s.r.o.",
    "email": "info@bohemiakonstrukt.cz",
    "phone": "+420 739 304 035",
    "city": "Strakonice I",
    "street": "Písecká 284",
    "postalCode": "38601",
    "website": "http://www.bohemiakonstrukt.cz"
  },
    ...
  {
    "name": "Střechy - Jan Jeremiáš",
    "email": "strechy.jeremias@seznam.cz",
    "phone": "+420 608 280 218",
    "city": "Rudolfov",
    "street": "Lesní 57/10",
    "postalCode": "37371",
    "website": "http://www.strechy-jeremias.cz"
  }
]
```

## Installation
1. `git clone git@github.com:strategio-digital/crawler-firmy.cz.git`
1. `npm i` (only without docker)

## Setup and run
1. Insert links in `apify_storage/key_value_store/default/INPUT.json`
    ``` json
    {
      "urls": [
        "https://www.firmy.cz/Remesla-a-sluzby/Remesla/Tesarstvi-pokryvacstvi-a-klempirstvi/kraj-jihocesky"
      ]
    }
    ```
1. `npm run start` or `docker-compose up`

## Generate JSON output 
1. Run `npm run merge` (only without docker)
1. Get your file from `apify_storage/results/prospects_<xyz>.json`

## Get prospects from remote server
1. `scp root@<IP>:/root/crawler-firmy.cz/apify_storage/results/prospects_<xyz>.json ./`