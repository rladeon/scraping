var casper = require('casper').create();
var mouse = require("mouse").create(casper);

console.log('start da scraping');
function getOffers()
{
	var links = document.querySelectorAll('li._3DFQ- a');
	return Array.prototype.map.call(links, function(e) {
		return e.getAttribute('href');
	});
}
casper.start('http://www.leboncoin.fr/', function(){
    
    casper.capture("screen1.png"); 
	casper.waitForSelector('button.cookieOk', function() {
	 	this.mouse.click('button.cookieOk');
        
	},function(){
		this.echo('failed founding button.cookieOk', 'INFO');
	});
	/**/
	casper.waitForSelector('a#county_24', function() {
	 	this.mouse.click('a#county_24');
        
	},function(){
		this.echo('failed founding a#county_24', 'INFO');
	});
	
})
.wait(5000).then(function() {
    this.capture('screen2.png');
	
	
});
casper.then(function() {
	console.log('getOffers');
links = this.evaluate(getOffers);

console.log('Show some links');
	this.echo(links.length + ' links found:');
	this.echo(' - https://www.leboncoin.fr' + links.join('\n - https://www.leboncoin.fr')).exit();
	var fs = require('fs');

	var path = 'output.txt';
	var content = "https://www.leboncoin.fr" + links.join('\nhttps://www.leboncoin.fr');
	fs.write(path, content, 'w');
});
casper.run();