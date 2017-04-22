const Nightmare = require('nightmare')
const nightmare = Nightmare({show: true});

// var selector = 'h1';
nightmare
    .goto('https://www.instagram.com/')
    .evaluate(function () {
        // now we're executing inside the browser scope.
        return document
            .querySelector('._du7bh')
            .innerText;
    }) // <-- that's how you pass parameters from Node scope to browser scope
    .end()
    .then(function (text) {
        console.log(text)
    })