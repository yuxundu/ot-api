'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {

  async test() {
    const result = await this.ctx.service.test.test();

    this.ctx.body = result;
  }
}

module.exports = TestController;
