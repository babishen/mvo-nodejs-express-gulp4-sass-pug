var express = require('express')
var router = express.Router()

router.get('/unsupported', function (req, res, next) {
  res.render('unsupported', { title: 'Unsuported Browser' })
})

module.exports = router
