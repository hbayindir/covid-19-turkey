const fs = require('fs');
const axios = require('axios');
const moment = require('moment-timezone');
const { Parser } = require('json2csv');

moment.updateLocale('tr');
moment.locale('tr');



async function update() {
    try {
        const res = await axios.get('https://covid19.saglik.gov.tr/covid19api?getir=sondurum');
        console.log(res.data)
        if (!res.data || !res.data.length) {
            console.log('no data available returning')
            return;
        }
        const timeline = JSON.parse(fs.readFileSync('dataset/timeline.json'));
        var data = res.data[0]
        let date = moment(data.tarih, 'DD.MM.YYYY').format('DD/MM/YYYY');
        const DOT_REGEX = /\./gi;
        let dayData = {
            date: date,
            totalTests: data.toplam_test.replace(DOT_REGEX, ''),
            totalCases: data.toplam_vaka.replace(DOT_REGEX, ''),
            totalDeaths: data.toplam_vefat.replace(DOT_REGEX, ''),
            totalIntensiveCare: data.toplam_yogun_bakim.replace(DOT_REGEX, ''),
            totalIntubated: data.toplam_entube.replace(DOT_REGEX, ''),
            totalRecovered: data.toplam_iyilesen.replace(DOT_REGEX, ''),
            tests: data.gunluk_test.replace(DOT_REGEX, ''),
            cases: data.gunluk_vaka.replace(DOT_REGEX, ''),
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
