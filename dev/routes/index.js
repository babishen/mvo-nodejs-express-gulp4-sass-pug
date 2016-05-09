var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/unsupported', function (req, res, next) {
  res.render('unsupported', { title: 'Unsuported Browser' })
})

module.exports = router
