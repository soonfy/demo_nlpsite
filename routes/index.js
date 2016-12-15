var express = require('express');
var router = express.Router();

const path = require('path')
const {nlpir, oops} = require('nlp_sf')
const fs = require('fs')

let userDict = path.join(__dirname, '../userDict/stars.txt')

let query = {
  top: 0,
  tags: ['star']
};

let dict = {
  // userDict: userDict
};

function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let {text} = req.query
  let params = {
    text: text,
    dict: dict,
    query: query
  }
  let words = oops.divide(params, 'obj');
  console.log(words);
  res.send({
    title: '分词',
    text,
    // words: [...words],
    words: strMapToObj(words)
  })
});

module.exports = router;
