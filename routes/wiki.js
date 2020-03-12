const router = require('express').Router();
const layout = require('../views/layout.js');
const addPage = require('../views/addPage.js');
const wikipage = require('../views/wikipage.js')
const main = require('../views/main.js')
const {User, Page} = require('../models/index.js');

router.get('/', async(req, res, next) => {
    let pages = await Page.findAll();
    
    res.send(main(pages))
});

router.post('/', async(req, res, next) => {
    try {
        const userData = {
            name: req.body.authorName,
            email: req.body.authorEmail
        }

        const pageData = {
            title: req.body.title,
            slug: '',
            content: req.body.text,
            status: req.body.status
        }
        
        let page = await new Page(pageData)  

        let [user] = await User.findOrCreate({
            where: userData
        })
       
        console.log(page)

        await user.save();
        await page.save();
        await page.setAuthor(user.id);

        res.redirect(`/wiki/${page.slug}`);

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

router.get('/:slug', async(req, res, next) => {
    try {
        let [page] = await Page.findAll({
            where : {
            slug: req.params.slug
            }
        }) 

        let [author] = await User.findAll({
            where : {
            id: page.authorId
            }
        }) 
        
        res.send(wikipage(page, author))
    } catch (err) {
        next(err)
    }    
})

module.exports = router