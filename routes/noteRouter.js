const router = require('express').Router()
// const auth = require('../middleware/auth')
// const noteCtrl = require('../controllers/noteCtrl')

router.route('/')
    .get((req, res) => res.json({msg: 'test notes'}))
    .post()

router.route('/:id')
    .get()
    .put()
    .delete()


module.exports = router