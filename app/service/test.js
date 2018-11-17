'use strict';
const Service = require('egg').Service;

// Imports the Google Cloud client library
const {
  Translate,
} = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'long-ceiling-221221';
const key = 'AIzaSyCu-2T7-1B2t3hk92YYwa5618OacoQi_3I';
// Instantiates a client
const translate = new Translate({
  projectId,
  key,
});

// The text to translate
const text = 'Hello, world!';
// The target language
const target = 'ru';

class TestService extends Service {
  async request() {
    const url = 'https://fixer.io/plan';
    const opts = {
      timeout: [ '30s', '30s' ],
    };
    return this.ctx.curl(url, opts);
  }
  async test() {
    // Translates some text into Russian
    await translate
      .translate(text, target)
      .then(results => {
        const translation = results[0];

        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  }
}

module.exports = TestService;
