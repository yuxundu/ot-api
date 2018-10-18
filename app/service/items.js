'use strict';
const Service = require('egg').Service;


const parseString = require('xml2js').parseString;
class ItemService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = this.config.ota.serverUrl;
    this.instanceKey = this.config.ota.instanceKey;
  }

  async request(url, data) {
    url = `${this.root}${url}`;
    const opts = {
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

    const provider = '<Provider>Undefined</Provider>';
    const itemTitle = `<ItemTitle>${params.itemTitle}</ItemTitle>`;
    const minPrice = isNaN(params.minPrice) ? '' : `<MinPrice>${params.minPrice}</MinPrice>`;
    const maxPrice = isNaN(params.maxPrice) ? '' : `<MaxPrice>${params.maxPrice}</MaxPrice>`;
    const currencyCode = params.currencyCode == null ? '' : `<CurrencyCode>${params.currencyCode}</CurrencyCode>`;
    const xmlParameters = '<SearchItemsParameters>' + provider + itemTitle + minPrice + maxPrice + currencyCode + '</SearchItemsParameters>';
    this.ctx.logger.debug('xmlParameters:' + xmlParameters);

    const result = await this.request('/SearchItemsFrame', {
      language: params.language,
      xmlParameters,
      framePosition: params.framePosition,
      frameSize: params.frameSize,
    });
    let json = '';
    parseString(result.data, function(err, result) {
      json = JSON.stringify(result);
    });
    return json;
  }
}

module.exports = ItemService;
