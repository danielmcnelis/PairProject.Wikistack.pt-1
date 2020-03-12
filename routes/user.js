const router = require('express').Router();
const {User, Page} = require('../models/index.js');
const userList = require('../views/userList');

router.get('/', async (req, res, next) => {
    let users = await User.findAll();

    res.send(userList(users));
})




module.exports = router