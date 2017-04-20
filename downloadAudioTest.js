const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});
const fs = require('fs');
const http = require('http');

nightmare
  .viewport(1000, 1000)
  .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome" +
      "/38.0.2125.111 Safari/537.36")
  .goto('http://aerotrak.bandcamp.com/album/at-ease')
  .wait()
  .click('h4.ft button.download-link')
  .type('#userPrice', '0')
  .wait(500)
  .click('#downloadButtons_download button')
  .wait()
  .wait(1000)
  // .evaluate(function () {
  //   return {
  //     name: $('.downloadItemTitle')
  //       .text()
  //       .trim(),
  //     href: $('.downloadGo')
  //       .prop('href')
  //       .trim()
  //   };
  // }, function (value) {
  //   var filename = './' + value.name + '.zip';
  //   var file = fs.createWriteStream(filename);
  //   var request = http.get(value.href, function (response) {
  //     response.pipe(file);
  //   });
  // })
  .click('.item-button')
  .end()
  .then(function (err, nightmare) {
    if (err) 
      return console.log(err);
    console.log('Done!');
  });
