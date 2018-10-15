'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  categoryRoutes();
  itemRoutes();

  function categoryRoutes() {
    router.get('/category/getRootCategoryInfoList', controller.category.getRootCategoryInfoList);
  }

  function itemRoutes() {
    router.get('/item/getCategoryItemInfoListFrame', controller.item.getCategoryItemInfoListFrame);
  }
};
