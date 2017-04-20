const useOldDownloadWay = false;

const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});


nightmare
	.goto('http://eprint.iacr.org/2004/152')
	.evaluate(function ev(old){
		var el = document.querySelector("[href*='.pdf']");
		var xhr = new XMLHttpRequest();
		xhr.open("GET", el.href, false);
		if (old) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		} else {
			xhr.responseType = "arraybuffer";
		}
		xhr.send();
		if (old) {
			return xhr.responseText;
		} else {
			var bytes = [];
			var array = new Uint8Array(xhr.response);
			for (var i = 0; i < array.length; i++) {
				bytes[i] = array[i];
			}
			return bytes;
		}
	}, function cb(data){
		var fs = require("fs");
		if (useOldDownloadWay) {
			fs.writeFileSync("book.epub", data, "binary");
		} else {
			fs.writeFileSync("book.epub", new Buffer(data), "binary");
		}
	}, useOldDownloadWay)
	.run(function (err, nightmare) {
		if (err) return console.log(err);
		console.log('Done!');
	})
    .end()