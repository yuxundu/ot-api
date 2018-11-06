'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  app.router.resources('items', '/api/v1/items', app.controller.items);
  router.get('/test', controller.test.test);
};
