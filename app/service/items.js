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

  async searchItemsFrame(params) {

    const provider = '<Provider>Undefined</Provider>';
    const itemTitle = `<ItemTitle>${params.itemTitle}</ItemTitle>`;
    const xmlParameters = '<SearchItemsParameters>' + provider + itemTitle + '</SearchItemsParameters>';

    const result = await this.request('/SearchItemsFrame', {
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
