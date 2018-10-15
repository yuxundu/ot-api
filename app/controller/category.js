'use strict';
const Controller = require('egg').Controller;

class CategoryController extends Controller {
  // Reception of the list of root categories
  async getRootCategoryInfoList() {
    const result = await this.ctx.curl('http://otapi.net/OtapiWebService2.asmx/GetRootCategoryInfoList', {
      data: {
        instanceKey: 'opendemo',
      },
    });
    this.ctx.status = result.status;
    this.ctx.set(result.headers);
    this.ctx.body = result.data;
  }
}

module.exports = CategoryController;
