var express = require('express');
var router = express.Router();

const path = require('path')
const {nlpir, oops} = require('nlp_sf')
const fs = require('fs')

// let userDict = path.join(__dirname, '../userDict/stars.txt')
// let userDict = path.join(__dirname, '../userDict/brands.txt')
// let userDict = path.join(__dirname, '../userDict/films.txt')

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
  let {text, tags = 'star,brand,film'} = req.query
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
  let {text, tags = 'star,brand,film'} = req.query
  tags = tags.split(',')
  let words = {}
  for(let tag of tags){
    let query = {
      top: 0,
      tags: [tag]
    };
    console.log(query);
    let params = {
      text: text,
      dict: dict,
      query: query
    }
    words[tag] = strMapToObj(oops.divide(params, 'obj'));
  }
  console.log(words);
  res.send(Object.assign({
    title: '分词',
    text,
    tags,
  }, words, {timestamp: Date.now()}))
});

module.exports = router;
