'use strict';
const Service = require('egg').Service;


class TestService extends Service {
  async request() {
    const url = 'https://fixer.io/plan';
    const opts = {
      timeout: [ '30s', '30s' ],
    };
    return this.ctx.curl(url, opts);
  }
  async test() {
    const result = await this.request();
    return result;
  }
}

module.exports = TestService;
