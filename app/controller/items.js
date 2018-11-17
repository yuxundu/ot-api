'use strict';

const Controller = require('egg').Controller;

class ItemsController extends Controller {
  async index() {
    const {
      ctx,
    } = this;

    ctx.validate({
      toCurrencyName: {
        type: 'string',
        required: false,
      },
      provider: {
        type: 'string',
        required: false,
      },
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
      providers: typeof (ctx.query.provider) === 'undefined' ? [ 'Undefined' ] : ctx.query.provider.split(','),
      itemTitle: ctx.query.itemTitle,
      minPrice: parseFloat(ctx.query.minPrice),
      maxPrice: parseFloat(ctx.query.maxPrice),
      currencyCode: ctx.query.currencyCode,
      language: typeof (ctx.query.language) === 'undefined' ? 'English' : ctx.query.language,
      translateLanguageCode: typeof (ctx.query.translateLanguageCode) === 'undefined' ? 'en' : ctx.query.translateLanguageCode,
      minFirstLot: parseInt(ctx.query.minFirstLot),
      framePosition: parseInt(ctx.query.framePosition),
      frameSize: parseInt(ctx.query.frameSize),
      toCurrencyName: ctx.query.toCurrencyName,
    };
    const result = await this.ctx.service.items.searchItemsFrame(params);

    this.ctx.body = result;
  }
}

module.exports = ItemsController;
