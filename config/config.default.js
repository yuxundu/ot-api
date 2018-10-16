'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539329394174_6697';
  // the config of the OTA
  config.ota = {
    serverUrl: 'http://otapi.net/OtapiWebService2.asmx',
    instanceKey: 'opendemo',
  };

  // add your config here
  config.middleware = [ ];


  exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  return config;
};

