'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('test/app/service/items.test.js', () => {
  let app;
  let ctx;
  before(async function() {
    app = mock.app();
    await app.ready();
    ctx = app.mockContext();
  });

  afterEach(mock.restore);

  describe('searchItemsFrame()', () => {
    it('', async function() {
      app.mockHttpclient(`${ctx.service.topics.root}/topic/57ea257b3670ca3f44c5beb6`, 'GET', {
        data: {
          success: true,
          data: {
            content: '<div class="markdown-text">Super Mock Content</div>',
            replies: [],
          },
        },
      });
      const result = await ctx.service.items.searchItemsFrame();


      assert(result === '1');
    });
  });
});
