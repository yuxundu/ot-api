'use strict';

const Controller = require('egg').Controller;

class ItemsController extends Controller {
  async index() {
    const {
      ctx,
    } = this;

    ctx.validate({
      itemTitle: {
        type: 'string',
        required: true,
      },
      minPrice: {
        type: 'string',
        format: /\d*.\d{1,2}|\d+/,
        required: false,
      },
      maxPrice: {
        type: 'string',
        format: /\d*.\d{1,2}|\d+/,
        required: false,
      },
      currencyCode: {
        type: 'string',
        format: /[A-Z]+/,
        required: false,
      },
      language: {
        type: 'string',
        required: false,
      },
      framePosition: {
        type: 'string',
        format: /\d+/,
        required: true,
      },
      frameSize: {
        type: 'string',
        format: /\d+/,
        required: true,
      },
    }, ctx.query);

    const params = {
      itemTitle: ctx.query.itemTitle,
      minPrice: parseFloat(ctx.query.minPrice),
      maxPrice: parseFloat(ctx.query.maxPrice),
      currencyCode: ctx.query.currencyCode,
      language: typeof (ctx.query.language) === 'undefined' ? '' : ctx.query.language,
      framePosition: parseInt(ctx.query.framePosition),
      frameSize: parseInt(ctx.query.frameSize),
    };
    const result = await this.ctx.service.items.searchItemsFrame(params);

    this.ctx.body = result;
  }
}

module.exports = ItemsController;
