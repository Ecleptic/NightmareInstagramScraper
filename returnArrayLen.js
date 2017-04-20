var Nightmare = require('nightmare');
var nightmare = Nightmare({show: true});

nightmare
  .goto('https://www.instagram.com/emarosa/')
  .evaluate(function () {
    // let array = [...document.querySelectorAll('._icyx7')]; return array.length;
    return Array
      .from(document.querySelectorAll('._icyx7'))
      .map(element => element.innerText)
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
