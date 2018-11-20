'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539329394174_6697';
  // the config of the OTA
  config.ota = {
    serverUrl: 'http://otapi.net/OtapiWebService2.asmx',
    instanceKey: '6fe9807c-56dd-4f87-a550-fe49cf4b7d6b',
  };
  // the config of the google-cloud-translate
  config.translate = {
    projectId: 'long-ceiling-221221',
    key: 'AIzaSyCu-2T7-1B2t3hk92YYwa5618OacoQi_3I',
  };
  // the config of the google-cloud-translate
  config.convert = {
    access_key: '86400c432690fff54e9bea2545dbc0bf',
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

