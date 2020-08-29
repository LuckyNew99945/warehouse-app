const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(`Error : ${err}`));
});
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(res.json('User Added!'))
    .catch((err) => res.json(`Error : ${err}`));
});

module.exports = router;
