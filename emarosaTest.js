const Nightmare = require('nightmare');		
const nightmare = Nightmare({ 
    show: true  
    // dock: true 
});

nightmare
  .goto('https://instagram.com/emarosa')
  .click('._icyx7')
  .screenshot(`IMAGES/${variable}.png`)
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