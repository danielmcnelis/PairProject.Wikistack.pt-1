const router = require('express').Router();
const {User, Page} = require('../models/index.js');
const userList = require('../views/userList');
const userPages = require('../views/userPages.js')

router.get('/', async (req, res, next) => {
    try {
        let users = await User.findAll();
        res.send(userList(users));
    } catch(err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {    
    try {
        
        let user = await User.findByPk(req.params.id)

        let pages = await Page.findAll({
            where: {
                authorId: user.id
            }
        })


        res.send(userPages(user, pages))
    } catch(err) {
        next(err)
    }
    
})




module.exports = router