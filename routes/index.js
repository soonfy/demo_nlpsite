var express = require('express');
var router = express.Router();

const {nlpir, oops} = require('oops_sf')

/* GET home page. */

router.get('/', function (req, res, next) {
  let {text = '联想胡歌快乐大本营'} = req.query;
  let results = oops.subdvd(text);
  console.log(results);
  res.send({
    results
  })
});

module.exports = router;
