var express = require('express');
var router = express.Router();

var GoogleSpreadsheet = require("google-spreadsheet");

router.use(function(req, res, next) {
  next();
});

router.get('/applications', function(req, res) {
  // Google auth
  var sheet_key = require('../keys/spreadsheet.json');
  var google_creds = require('../keys/HackUPC-google.json');
  var applications_sheet = new GoogleSpreadsheet(sheet_key.key);

  applications_sheet.useServiceAccountAuth(google_creds, function(err) {
    applications_sheet.getInfo(function(err, sheet_info) {
      var applications = sheet_info.worksheets[2];
      applications.getRows(function(err, rows) {
        //console.log(rows);
        res.send({rows: rows});
      });
    });
  });
});

module.exports = router;