# Firmy.cz crawler
Firmy.cz listing & prospecting crawler based on Apify SDK

## Example output for URL
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
1. `npm i`
1. `npm i apify-cli -g`

## Setup and run
1. Insert links in `apify_storage/key_value_store/default/INPUT.json`
    ``` json
    {
      "urls": [
        "https://www.firmy.cz/Remesla-a-sluzby/Remesla/Tesarstvi-pokryvacstvi-a-klempirstvi/kraj-jihocesky"
      ]
    }
    ```
1. `apify run`

## Generate JSON output 
1. Run `node src/prospector/merge-prospects.js`
1. Get your file from `apify_storage/results/prospects_<xyz>.json`