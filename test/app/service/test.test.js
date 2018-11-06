'use strict';

const assert = require('assert');
const mock = require('egg-mock');
describe('test/service/test.test.js', () => {
  let app;
  before(() => {
    // 创建当前应用的 app 实例
    app = mock.app();
    // 等待 app 启动成功，才能执行测试用例
    return app.ready();
  });

  describe('test()', () => {
    it('should test', function* () {
      const ctx = app.mockContext();
      const result = ctx.service.test.test();
      assert(result);

    });
  });
});
