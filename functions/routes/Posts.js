const router = require('express').Router();
const Post = require('../models/Posts');
const cors = require('cors');


// CREATE
router.post('/', async (req, res) => {
    const {title, description, content, image} = req.body;

    const post = {
        title,
        description,
        content,
        image
    }

    try{
        await Post.create(post);

        res.status(201).json({message: 'Post registered successfully'})
    } catch(error){
        res.status(500).json({error: error});
    };
})

// READ
router.get('/', cors(), async (req, res) => {
    try{
        // THIS WILL RETURN ALL POSTS FROM MONGODB COLLECTION
        const post = await Post.find();

        res.status(200).json(post);
    } catch(error){
        res.status(500).json({error: error});
    };
})

// READ ONE
router.get('/:id', async (req, res) => {
    try{
        await Post.findOne({_id: req.params.id}).lean().then(post => {
            if(post){
                res.status(200).json(post)
            }
        }).catch(error => {
            res.status(500).json({error: error});
        })

    } catch(error){
        res.status(500).json({error: error});
    };
})

module.exports = router;