var express = require('express');
const Author = require('../models/author');
var router = express.Router();


/* all author route */
router.get('/', async (req, res, next) => {
    let searchOptions = {};
        if (req.query.name != null && req.query.name !== '') {
            searchOptions.name = new RegExp(req.query.name, 'i')// means case insensitive
        }
        try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{
          authors:authors,
          searchOptions: req.query});
    }catch{
        res.redirect('/');
    }
  
});

/* New Author Route. */
router.get('/new', (req, res, next) => {
    res.render('authors/new',{author: new Author()});
  });

  /* Create Author Route. */
router.post('/', async (req, res, next) => {
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors');
    }catch{
        res.render('authors/new',{
        author: author,
        errorMessage: 'Error creating Author'
    })
    }
     });
module.exports = router;
