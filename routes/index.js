var express = require('express');
var router = express.Router();

const path = require('path')
const {nlpir, oops} = require('nlp_sf')
const fs = require('fs')

let userDict = path.join(__dirname, '../userDict/stars.txt')

let dict = {
  userDict: userDict
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
  let {text, tags = 'star,brands'} = req.query
  tags = tags.split(',')
    let query = {
    top: 0,
    tags
  };
  let params = {
    text: text,
    dict: dict,
    query: query
  }
  let words = oops.divide(params, 'obj');
  res.render('index', {
    title: '分词',
    text,
    words
  })
});

router.get('/divide', function(req, res, next) {
  let {text} = req.query
  let params = {
    text: text,
    dict: dict,
    query: query
  }
  let words = oops.divide(params, 'obj');
  res.send({
    title: '分词',
    text,
    tags: query.tags,
    words: strMapToObj(words),
    status: 'ok',
    timestamp: Date.now()
  })
});

module.exports = router;
