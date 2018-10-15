'use strict';
const Controller = require('egg').Controller;

class ItemController extends Controller {
  // Reception of the partial list of the goods of a category
  async getCategoryItemInfoListFrame() {
    const result = await this.ctx.curl('http://otapi.net/OtapiWebService2.asmx/GetCategoryItemInfoListFrame', {
      data: {
        instanceKey: 'opendemo',
        categoryId: 'otc-213',
        framePosition: 0,
        frameSize: 10,

      },
    });
    this.ctx.status = result.status;
    this.ctx.set(result.headers);
    this.ctx.body = result.data;
  }
}

module.exports = ItemController;
