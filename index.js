const fs = require('fs');
const axios = require('axios');
const moment = require('moment-timezone');
const { Parser } = require('json2csv');
const { JSDOM } = require('jsdom');
moment.updateLocale('tr');
moment.locale('tr');

async function update() {
    try {

        const dom = await JSDOM.fromURL('https://covid19.saglik.gov.tr/?lang=tr-TR', {
            includeNodeLocations: true,
            runScripts: "dangerously"
        });
        // We need to delay one extra turn because we are the first DOMContentLoaded listener,
        // but we want to execute this code only after the second DOMContentLoaded listener
        // (added by external.js) fires.


        const data = dom.window.sondurumjson[0]
        const date = moment(data.tarih, 'DD.MM.YYYY').format('DD/MM/YYYY');

        const timeline = JSON.parse(fs.readFileSync('dataset/timeline.json'));
        
    	/*
         * Following code block traverses whole JSON data and adds the missing fields if any.
         * Normally, the block will be left disabled for performance reasons but, may be
         * enabled when there's a data format change.
         */
        /*
        var fields = ["cases"]
        for (day in timeline){

            for (field in fields){
                if (!(fields[field] in timeline[day])){
                    console.log(day + " doesn't have the " + fields[field] + " field.");
                    timeline[day][fields[field]] = '';
                }
            }
        }
        */
        
        const DOT_REGEX = /\./gi;
        let dayData = {
            date: date,
            totalTests: data.toplam_test.replace(DOT_REGEX, ''),
            totalPatients: data.toplam_hasta.replace(DOT_REGEX, ''),
            totalDeaths: data.toplam_vefat.replace(DOT_REGEX, ''),
            totalIntensiveCare: data.toplam_yogun_bakim.replace(DOT_REGEX, ''),
            totalIntubated: data.toplam_entube.replace(DOT_REGEX, ''),
            totalRecovered: data.toplam_iyilesen.replace(DOT_REGEX, ''),
            tests: data.gunluk_test.replace(DOT_REGEX, ''),
            cases: data.gunluk_vaka.replace(DOT_REGEX, ''),
            patients: data.gunluk_hasta.replace(DOT_REGEX, ''),
            critical: data.agir_hasta_sayisi.replace(DOT_REGEX, ''),
            pneumoniaPercent: `%${data.hastalarda_zaturre_oran.replace(DOT_REGEX, ',')}`,
            deaths: data.gunluk_vefat.replace(DOT_REGEX, ''),
            recovered: data.gunluk_iyilesen.replace(DOT_REGEX, '')
        }
        
        timeline[date] = dayData

        console.log(dayData)
        const csv = new Parser(Object.keys(dayData)).parse(Object.values(timeline));
        const json = JSON.stringify(timeline, null, 4);
        fs.writeFileSync('dataset/timeline.csv', csv);
        fs.writeFileSync('dataset/timeline.json', json);
    } catch (e) {
        console.log(e);
    }
}

update();
