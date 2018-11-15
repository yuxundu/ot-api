'use strict';
const Service = require('egg').Service;


const parseString = require('xml2js').parseString;
// Imports the Google Cloud client library
// const {
//   Translate,
// } = require('@google-cloud/translate');
// const projectId = 'long-ceiling-221221';

// const translate = new Translate({
//   projectId,
// });
class ItemService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = this.config.ota.serverUrl;
    this.instanceKey = this.config.ota.instanceKey;
  }

  async request(url, data) {
    url = `${this.root}${url}`;
    const opts = {
      timeout: [ '30s', '30s' ],
      data: Object.assign({
        instanceKey: `${this.instanceKey}`,
      }, data),
    };
    return this.ctx.curl(url, opts);
  }

  async convertMoney(from, to, amount) {
    const url = `https://data.fixer.io/api/convert?access_key=86400c432690fff54e9bea2545dbc0bf&from=${from}&to=${to}&amount=${amount}&format=1`;
    const opts = {
      timeout: [ '30s', '30s' ],
      dataType: 'json',
    };
    return this.ctx.curl(url, opts);
  }
  /**
 * Global search of the goo
 * @param {SearchItemsParameters} params search Parameters
 * itemTitle: required
 * minPrice: Floor price
 * maxPrice: roof price
 * currencyCode: Currency Code shoule be upper case
 * CNY,USD,EUR
 * language: Autotranslation is available for the following languages
 * Russian, English, Mongolian, Chinese, Spanish, German, Portuguese, Bulgarian, Hebrew, Armenian, Yakut, Polish, Romanian, Ukrainian, Finnish, Japanese, Azerbaijani, Кyrgyz, Czech, Arabic, Korean
 * framePosition: required element Number since which the list
 * frameSize: required  Quantity of the elements getting to the list
 * @return {OtapiItemSearchResult} http: //docs.otapi.net/en/Documentations/Type?name=OtapiItemSearchResult
 */
  async searchItemsFrame(params) {

    const result = [];

    for (const index in params.providers) {
      const providerStr = params.providers[index];
      const provider = `<Provider>${providerStr}</Provider>`;
      const itemTitle = `<ItemTitle>${params.itemTitle}</ItemTitle>`;
      const minPrice = isNaN(params.minPrice) ? '' : `<MinPrice>${params.minPrice}</MinPrice>`;
      const maxPrice = isNaN(params.maxPrice) ? '' : `<MaxPrice>${params.maxPrice}</MaxPrice>`;
      const currencyCode = params.currencyCode == null ? '' : `<CurrencyCode>${params.currencyCode}</CurrencyCode>`;
      const minFirstLot = isNaN(params.minFirstLot) ? '' : `<MaxFirstLot>${params.minFirstLot}</MaxFirstLot>`;
      const xmlParameters = '<SearchItemsParameters>' + provider + itemTitle + minPrice + maxPrice + currencyCode + minFirstLot + '</SearchItemsParameters>';
      this.ctx.logger.debug('xmlParameters:' + xmlParameters);

      const resultAPI = await this.request('/SearchItemsFrame', {
        language: params.language,
        xmlParameters,
        framePosition: params.framePosition,
        frameSize: params.frameSize,
      });
      let json = '';
      parseString(resultAPI.data, function(err, data) {
        json = JSON.stringify(data);
      });

      const jsonObj = JSON.parse(json);

      this.ctx.logger.info(jsonObj.OtapiItemSearchResultAnswer.ErrorCode);
      if (jsonObj.OtapiItemSearchResultAnswer.ErrorCode[0] === 'Ok') {
        const items = jsonObj.OtapiItemSearchResultAnswer.Result[0].Items[0].Content;
        // this.ctx.logger.info(items);
        // this.ctx.logger.info(items[0].Item);
        for (const index in items[0].Item) {
          const item = items[0].Item[index];
          // const itemInfoAPI = await this.request('/GetItemInfo', {
          //   language: params.language,
          //   itemId: item.Id[0],
          // });
          // let jsonItmeInfo = '';
          // parseString(itemInfoAPI.data, function(err, data) {
          //   jsonItmeInfo = JSON.stringify(data);
          // });
          // const jsonItemInfoObj = JSON.parse(jsonItmeInfo);
          // if (jsonItemInfoObj.OtapiItemInfoAnswer.ErrorCode[0] === 'Ok') {
          //   this.ctx.logger.debug(jsonItemInfoObj.OtapiItemInfoAnswer.OtapiItemInfo[0].Title[0]);
          //   item.Title[0] = jsonItemInfoObj.OtapiItemInfoAnswer.OtapiItemInfo[0].Title[0];
          // }
          this.ctx.logger.debug(item.Title[0]);
          item.Title[0] = 'test';
          if (item.OriginalTitle) {
            this.ctx.logger.info(item.OriginalTitle[0]);
          }
          //* * convert price   */
          if (typeof params.toCurrencyName !== 'undefined') {
            if (item.Price && item.Price[0]) {
              this.ctx.logger.debug(item.Price[0]);
              const price = item.Price[0];
              const originalCurrencyCode = price.OriginalCurrencyCode;
              const originalPrice = price.OriginalPrice;
              this.ctx.logger.debug(originalPrice);
              const convertResultAPI = await this.convertMoney(originalCurrencyCode, params.toCurrencyName, originalPrice);
              if (convertResultAPI.data && convertResultAPI.data.success === true) {
                price.FixerConvertedPrice = `${convertResultAPI.data.result}`;
                price.FixerCurrencyName = params.toCurrencyName;
              }
            }
          }

          // The text to translate
          // const text = 'Hello, world!';
          // The target language
          // const target = 'ru';
          // Translates some text into Russian
          // await translate
          //   .translate(text, target)
          //   .then(results => {
          //     const translation = results[0];

          //     this.logger.debug(`Text: ${text}`);
          //     this.logger.debug(`Translation: ${translation}`);
          //   })
          //   .catch(err => {
          //     this.logger.error('ERROR:', err);
          //   });
        }
      }
      this.logger.debug(jsonObj);
      result.push(jsonObj);
    }
    return result;
  }
}

module.exports = ItemService;
