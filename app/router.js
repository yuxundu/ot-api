'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/v1/items/searchItemsFrame/:itemTitle/:framePosition/:frameSize', controller.items.searchItemsFrame);
  // app.router.resources('items', '/api/v1/items', controller.items);
};
