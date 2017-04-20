const Nightmare = require('nightmare');
require('nightmare-inline-download')(Nightmare)
const nightmare = Nightmare({show: false});

nightmare.goto('https://instagram.com/emarosa')
// .click('._icyx7')
  .evaluate(function () {
    const imageArray = Array
      .from(document.querySelectorAll('._icyx7'))
      .map(element => element.innerText)
    //  return imageArray.length
    return imageArray

  })
  // .wait(3000)
  .end()
  .then(function (result) {
    console.log(result.length)
    for (let i=0;i< result.length;i++) {
      console.log(result[i])
    }
  })
  .catch(function (error) {
    console.error('Search failed:', error)
  });