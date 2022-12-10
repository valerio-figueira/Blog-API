const router = require('express').Router();
const AsidePosts = require('../models/AsidePosts');


// CREATE
router.post('/', async (req, res) => {
    const { post_number, title, description, content, image } = req.body;

    const post = {
        post_number,
        title,
        description,
        content,
        image
    }

    try{
        await AsidePosts.create(post);

        res.status(201).json({message: 'Post registered successfully'})
    } catch(error){
        res.status(500).json({error: error});
    };
})


// READ
router.get('/', async (req, res) => {
    try{
        const post = await AsidePosts.find();

        res.status(200).json(post);
    } catch(error){
        res.status(500).json({error: error});
    };
})

// READ ONE
router.get('/:id', async (req, res) => {
    try{
        await AsidePosts.findOne({_id: req.params.id}).lean().then(post => {
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