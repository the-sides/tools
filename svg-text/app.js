const TextToSVG = require('text-to-svg');
const pugger = require('html2jade');
const textToSVG = TextToSVG.loadSync();
const svg = textToSVG.getSVG('hello');
console.log(svg)
console.log('====================================================')
pugger.convertHtml(svg, {}, function (err, jade) {
    if(err) console.error(err);
    else console.log(jade) 
  });
