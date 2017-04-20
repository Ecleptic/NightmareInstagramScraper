const Nightmare = require('nightmare');		
const nightmare = Nightmare({ show: true });
const USERNAME = 'cgreen@chadjoneslaw.com'
const PASSWORD = '1Cameron'

nightmare
  .goto('https://instagram.com')
  .click('._fcn8k')
  .type('[name=username]', USERNAME )
  .type('[name=password]', PASSWORD)
  .click('._ah57t')
  .wait('._8mlbc')
  .click('._8mlbc')
  .screenshot('._ovg3g')
  // .wait('#zero_click_wrapper .c-info__title a')
  // .evaluate(function () {
  //   return document.querySelector('#zero_click_wrapper .c-info__title a').href;
  // })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });

