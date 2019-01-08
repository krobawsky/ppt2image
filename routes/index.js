var express = require('express');
var router = express.Router();

var Converter = require('../public/javascripts/convert');
var glob = require('glob');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ppt Converter' });
  console.log('------------------------');
  glob('**/itil.pptx', {}, function(error, files) {
    console.log('files: ', files.length);
    if(files) {
        new Converter({
            files:          files,
            output:         'public/output/imgs/',
            invert:         false,
            greyscale:      false,
            deletePdfFile:  false,
            outputType:     'png',
            logLevel:       2,
            fileNameFormat: '_vers_%d',
            callback:       function(data) {
                console.log(data.failed, data.success.length, data.files.length, data.time);
            }
        }).run();
    }
  });
});

module.exports = router;
