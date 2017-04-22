const Nightmare = require('nightmare')
const nightmare = Nightmare({show: false, openDevTools: false});
const config = require('./config')
const URLs = config.URLs
/** CAREFUL IT'S ASYNCRONYOUS */

/**
 * This Script will recursively iterate through public
 * instagram pages and screenshot each set of images per page.
 */

let urlNumber = 0

setup(urlNumber)

/**
   * Sets up the Nightmare Instance, catches if we are finished
   * @param {int} urlNumber The number of which url we are navigating to.
   */

function setup(urlNumber) {
    if (urlNumber > URLs.length - 1) {
        nightmare
            .end()
            .then(() => {
                // console.log("Script Ending")
            })
        return
    }
    navigateToAddress(`https://www.instagram.com/${URLs[urlNumber]}/`)
}

/**
 * navigates the page to the current URL
 * @param {string} address The url of the current page
 */
function navigateToAddress(address) {
    nightmare
        .goto(address)
        .wait('._bkw5z')
        .wait('._ovg3g')
        .exists('._8yoiv')
        /* 
            * This piece is supposed to get rid of the popup at the bottom, but doesn't work quite yet.

        .then((elementExists) => {
             nightmare.click('._8yoiv').catch((error) => {console.error( error)});
             return elementExists
         })
         */
        .then(() => {
            getLength()
        })
        .catch((error) => {
            console.error('Search failed inside navigateToAddress: ', error);
        });
}
/**
 * scrapes for the number of images in the page
 * @returns {int} length of album
 */
function getLength() {
    nightmare.evaluate(() => {
        return document
            .querySelector('._bkw5z')
            .innerText;
    }).then((lengthNumber) => {
        nightmare
            .wait(300)
            .click('._8mlbc') // try this
            .wait('._a012k')
            .catch((error) => {
                console.error('Search failed inside getLength: ', error);
            });
        nextImageScreenshot(0, lengthNumber)
    })
}
/**
 * recursively screenshots the page and then clicks to the next image
 * @param {int} counter Which image is getting screenshot
 * @param {int} length from getLength() The number of images in an album
 */

function nextImageScreenshot(counter, length) {
    nightmare.viewport(1920, 1080)
    console.log(`Counter: ${counter}, Length: ${length}`)
    if (counter > length) {
        console.log("Ending this round")
        nightmare.then(() => {
            setup(++urlNumber)
        })
        return
    }
    nightmare.screenshot(`IMAGES/${URLs[urlNumber]}_Screenshot_${counter}.png`)
        .wait('.coreSpriteRightPaginationArrow')
        .click('.coreSpriteRightPaginationArrow')
        .wait('._a012k')
        .then(() => {
            nextImageScreenshot(++counter, length)
        })
        .catch((error) => {
            console.error('Search failed inside nextImageScreenshot: ', error);
        });
}