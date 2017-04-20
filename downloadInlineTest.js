const Nightmare = require('nightmare')
require('nightmare-inline-download')(Nightmare)
const nightmare = Nightmare({ show: true });
const downloadInfo = nightmare
    .goto('https://github.com/segmentio/nightmare')
    .click('a[href="/segmentio/nightmare/archive/master.zip"]')
    .download('Downloads/master.zip')

// ... do something with downloadInfo, in an evaluate for example ...
    .end()
    .then(() => console.log('done'))