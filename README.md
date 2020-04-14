
# covid19-turkey-api  ![Auto Updates](https://github.com/hbayindir/covid-19-turkey/workflows/Sheduler%20Workflow/badge.svg)

Bu repository Ozan Ertürk'ün geliştirmiş olduğu [covid19-turkey-api](https://github.com/ozanerturk/covid19-turkey-api) kodunun bir çatallamasıdır.

![Image of Application](https://github.com/hbayindir/covid-19-turkey/raw/master/assets/Screenshot%20from%202020-04-12%2021-44-44.png)

### [Website](https://hbayindir.github.io/covid-19-turkey/)
## Datasets
### [JSON](https://raw.githubusercontent.com/hbayindir/covid-19-turkey/master/dataset/timeline.json) 
### [CSV](https://raw.githubusercontent.com/hbayindir/covid-19-turkey/master/dataset/timeline.csv)

Bu uygulama her 5 dakikada bir  T.C. Sağlık bakanlığının [https://covid19.saglik.gov.tr](https://covid19.saglik.gov.tr/#) adresindeki bilgiler ile verisetlerini günceller. Uygulama doğrudan Github Actions üzerinde çalışır. [dataset](dataset) klasörünün içinde güncel data JSON ve CSV olarak barınmaktadır.
Geriye dönük bilgiler aşağıdaki kaynaklar kullanılarak elde edilmiştir.

-----

*This application updates data sets by pulling data from the website of the Turkish Ministry of Health [https://covid19.saglik.gov.tr](https://covid19.saglik.gov.tr/#) every 5 minutes. Application works directly over Github Actions. Most recent data can be found in [dataset](dataset) folder in JSON and CSV format.*

*Historical data has been obtained from the datasources listed below.*

-----

Other Api's related to COVID-19
https://covid-19-apis.postman.com/

*Kaynaklar/Resources:*
- [https://covid19.saglik.gov.tr](https://covid19.saglik.gov.tr/#) 
- [Türkiye Cumhuriyeti Sağlık Bakanı - Minister of Health of the Republic of Turkey](https://twitter.com/drfahrettinkoca)
- [COVID-19 Türkiye Web Portalı (TÜBİTAK)](https://covid19.tubitak.gov.tr/turkiyede-durum)

