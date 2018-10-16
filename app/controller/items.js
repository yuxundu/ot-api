'use strict';

const Controller = require('egg').Controller;

class ItemsController extends Controller {

  async searchItemsFrame() {
    const {
      ctx,
    } = this;
    const params = {
      itemTitle: ctx.params.itemTitle,
      framePosition: parseInt(ctx.params.framePosition),
      frameSize: parseInt(ctx.params.frameSize),
    };
    const result = await this.ctx.service.items.searchItemsFrame(params);

    this.ctx.body = result;


  }
}

module.exports = ItemsController;
