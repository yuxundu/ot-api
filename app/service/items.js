'use strict';
const Service = require('egg').Service;


const parseString = require('xml2js').parseString;
// const translate = require('google-translate-api');
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
  /**
 * Global search of the goods
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
      const xmlParameters = '<SearchItemsParameters>' + provider + itemTitle + minPrice + maxPrice + currencyCode + '</SearchItemsParameters>';
      this.ctx.logger.debug('xmlParameters:' + xmlParameters);

      const resultAPI = await this.request('/SearchItemsFrame', {
        language: params.language,
        xmlParameters,
        framePosition: params.framePosition,
        frameSize: params.frameSize,
      });
      let json = '';
      parseString(resultAPI.data, function(err, resultAPI) {
        json = JSON.stringify(resultAPI);
      });

      const jsonObj = JSON.parse(json);
      result.push(jsonObj);
      this.ctx.logger.info(jsonObj.OtapiItemSearchResultAnswer.ErrorCode);
      // if (jsonObj.OtapiItemSearchResultAnswer.ErrorCode[0] === 'Ok') {
      //   const items = jsonObj.OtapiItemSearchResultAnswer.Result[0].Items[0].Content;
      //   this.ctx.logger.info(items);
      //   this.ctx.logger.info(items[0].Item);
      //   for (const index in items[0].Item) {
      //     const item = items[0].Item[index];
      //     this.ctx.logger.info(item.Title[0]);
      // item.Title[0] = 'test';
      // this.ctx.logger.info(item.OriginalTitle[0]);

      // await translate('Ik spreek Engels', {
      //   to: 'en',
      // }).then(res => {
      //   this.ctx.logger.info(res.text);
      //   // => I speak English
      //   this.ctx.logger.info(res.from.language.iso);
      //   // => nl
      // }).catch(err => {
      //   console.error(err);
      // });
      // }
      // }


    }
    return result;
  }
}

module.exports = ItemService;
