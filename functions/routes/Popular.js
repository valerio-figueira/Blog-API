const router = require('express').Router();
const Popular = require('../models/Popular');

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
        await Popular.create(post);

        res.status(201).json({message: 'Post registered successfully'});
    } catch(error){
        res.status(500).json({error:error});
    };
})

// READ
router.get('/', async (req, res) => {
    try{
        // THIS WILL RETURN ALL POSTS FROM MONGODB COLLECTION
        const post = await Popular.find();

        res.status(200).json(post);
    } catch(error){
        res.status(500).json({error: error});
    };
})

// READ ONE
router.get('/:id', async (req, res) => {
    try{
        await Popular.findOne({_id: req.params.id}).lean().then(post => {
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