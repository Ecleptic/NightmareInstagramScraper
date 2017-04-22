const Nightmare = require('nightmare')
const nightmare = Nightmare({show: false, openDevTools: false});

const URLs = ['emarosa', 'ucla']
let number

for (urlNumber in URLs) {
    // let urlNumber = 0
    // console.log("urlNumber = " + urlNumber)
    // console.log(`New URL is: https://www.instagram.com/${URLs[urlNumber]}`)
    setup()
    function setup() {
        number = 0
        firstStep(`https://www.instagram.com/${URLs[urlNumber]}`)
    }

    function firstStep(address) {
        // console.log("beginning first Step, number is: " + number)
        // console.log("Address is: " + address)
        nightmare
            .goto(address)
            .wait('._bkw5z')
            .wait('._ovg3g')
        getLength()

    }
    function getLength() {
        // console.log("getLength")
        nightmare.evaluate(function () {
            return document
                .querySelector('._bkw5z')
                .innerText;
        })
        // .end()
            .then(function (lengthNumber) {
                number = lengthNumber
                // console.log("number inside getLength.then is: " + number)
                nightmare
                    .wait(300)
                    .click('._8mlbc') // try this
                    // .click('._ovg3g')    // or this
                    .wait('._a012k')
                    .catch(function (error) {
                        console.error('Search failed inside getLength: ', error);
                    });
                nextImageScreenshot()
            })

    }

    function nextImageScreenshot() {
        // nightmare.viewport(1200, 550); nightmare.viewport(1920, 1080);
        nightmare.viewport(3840, 2160)
        let keepGoing = true
        let imageNumber = 0
        while (keepGoing) {
            nightmare.screenshot(`IMAGES/${URLs[urlNumber]}_Screenshot_${imageNumber}.png`)
                .wait('.coreSpriteRightPaginationArrow')
                .click('.coreSpriteRightPaginationArrow')
                .wait('._a012k')
            imageNumber++;
            if (imageNumber >= number) {
                nightmare
                    .end()
                    .catch(function (error) {
                        console.error('Search failed inside nextImageScreenshot: ', error);
                    });
                console.log("nightmare.End")
                keepGoing = false
            }
        }
    }
}