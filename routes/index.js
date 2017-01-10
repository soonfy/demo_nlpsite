var express = require('express');
var router = express.Router();

const path = require('path')
const {nlpir, oops} = require('nlp_sf')
const fs = require('fs')

let userDictPath = path.join(__dirname, '../userDict')

function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  let {text, tags = 'stars,brands'} = req.query
  tags = tags.split(',')
  let query = {
    top: 0,
    tags
  };
  let params = {
    text: text,
    query: query
  }
  let words = oops.divide(params, 'obj');
  res.render('index', {
    title: '分词',
    text,
    words
  })
});

router.get('/divide', function (req, res, next) {
  let {text, tags = 'stars,brands,films'} = req.query
  tags = tags.split(',')
  let words = {}
  for (let tag of tags) {
    let query = {
      top: 0,
      tags: [tag]
    };
    console.log(query);
    let params = {
      text: text || '输入文本有误。',
      query: query
    }
    words[tag] = strMapToObj(oops.divide(params, 'obj'));
  }
  res.send(Object.assign({
    title: '分词',
    text,
    tags,
  }, words, { timestamp: Date.now() }))
});

router.get('/update', function (req, res, next) {
  let userDicts = fs.readdirSync(userDictPath)
  for (let userDict of userDicts) {
    userDict = path.join(userDictPath, userDict)
    let dict = {
      userDict: userDict
    };
    let params = {
      text: '更新字典。',
      dict: dict
    }
    oops.divide(params, 'obj');
  }
  res.send(Object.assign({
    title: '字典',
    userDicts,
  }, { timestamp: Date.now() }))
});

module.exports = router;
