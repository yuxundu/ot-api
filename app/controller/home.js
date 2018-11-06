'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('home.tpl');
  }
  async isIOS() {
    this.ctx.body = `isIOS: ${this.ctx.isIOS}`;
  }
}

module.exports = HomeController;
