const router = require('express').Router();
const layout = require('../views/layout.js');
const addPage = require('../views/addPage.js');
const {User, Page} = require('../models/index.js');
router.get('/', async(req, res, next) => {

    res.send(layout('hey bro'))
});

router.post('/', async(req, res, next) => {
    try {
        const userData = {
            name: req.body.authorName,
            email: req.body.authorEmail
        }

        const pageData = {
            title: req.body.title,
            slug: req.body.title.replace(/[\s\W]/g, ''),
            content: req.body.text,
            status: req.body.status
        }
        
        let user = await User.findAll({
            where: userData
        });

        if (user.length) {
            user = await User.create(userData)
        }

        let page = await Page.create(pageData)

        await user.save();
        await page.save();
        res.redirect('/');

    } catch(err) {
        next(err)
    }
})


router.get('/add', async (req, res, next) => {
    try {
        res.send(addPage());
    } catch(err) {
        next(err)
    }
})







module.exports = router